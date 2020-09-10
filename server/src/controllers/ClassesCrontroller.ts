import {Request, Response} from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHoursToMinutes';

// define globalmente qual a estrutura das variaveis para o typeScript 
interface ScheduleItem {
    week_day: number;
    from: string;
    to:string;
}

export default class ClassesController {
    async index(request: Request, response: Response){
        const filters = request.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;



        if(!filters.week_day ||  !filters.subject || !filters.time){
            return response.status(400).json({
                error: "Missing filters to search classes"
            })
        }

        const timeinMinutes = convertHourToMinutes(time);

        //filtrando informações
        const classes = await db('classes')
            .whereExists(function() {               // fazendo uma query verificando se existe um horario disponivel nessa consulta realizada
                this.select('class_schedule.*')
                    .from('class_schedule')
                        //       tabela           coluna   -> o "."entre elas serve para indicar que a coluna está dentro da tabela
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')                     //escreve o where inteiro do zero || é melhor usar dessa forama quando fazer um ".weheExists"
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeinMinutes]) // filtra o horario de trabalho inicial
                    .whereRaw('`class_schedule`.`to` > ??', [timeinMinutes]) // filtra o horario de trabalho final
            })
            .where('classes.subject', '=', subject) // quando a materia pesquisada for igual a cadastrada no DB
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);


        return response.json(classes);
    }


    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        //usado para descartar todos os dados caso de problema na hora de cadastra algum
        const trx = await db.transaction()
    
        try {
            
            //espera carregar os dados e na tabela users, insere as informações
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });
    
            //retorna o id do usuario
            const user_id = insertedUsersIds[0];
    
            const insertedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id
                
            });
    
            //retorna o id da aula criada
            const class_id = insertedClassesIds[0];
    
            const classSchedule = schedule.map((scheduleItem: ScheduleItem ) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });   
    
            await trx('class_schedule').insert(classSchedule);
    
            // nesse momento ele insere todos os dados ao mesmo tempo
            await trx.commit();
    
            return response.status(201).send();
    
        } catch (err) {
            await trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new class' 
            })
        }
    
    }
}