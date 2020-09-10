import React, {useState, FormEvent} from "react";
import { useHistory } from 'react-router-dom';


// *************** COMPONENTS ***************// 
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import waringIcon from '../../assets/images/icons/warning.svg'
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import './styles.css';
import api from "../../services/api";

function TeacherForm() {
    const history = useHistory();


    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio ] = useState('');


    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
           { week_day: 0, from: '', to: '' }

        ]);

    }

    
    //setScheduleItemValue(0, 'week_day', '2')

    function setScheduleItemsValue(position: number, field:string, value:string){

        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            //verifica se o valor que esta vindo no map pelo array é o do index igual a posição 
            if (index === position) {
                //se for, pega todos os valores de schedule itens, e insere os valores no campo adicionando os dados
                return {...scheduleItem, [field]: value}
            }
            //caso não seja, retorna os valores que ele já possuia
            return scheduleItem;
        })

        setScheduleItems(updateScheduleItems);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();
        
        console.log(scheduleItems);
        api.post('classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastrado com sucesso!');
            history.push('/')
        }).catch(() => {
            alert('Erro no cadastro!');
        })
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulario de inscrição"
                
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" label="Nome completo" value={name} onChange={(e) => {setName(e.target.value)}} />
                        <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => {setAvatar(e.target.value)}} />
                        <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={(e) => {setWhatsapp(e.target.value)}} />
                        <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => {setBio(e.target.value)}} />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            name="subject" 
                            label="Matéria" 
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Fisica', label: 'Fisica' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Portugês', label: 'Portugês' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Educação fisica', label: 'Educação fisica' },
                            ]}

                        />


                        <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(e) => {setCost(e.target.value)}} />
                    </fieldset>
                    <fieldset>
                        <legend>Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem} >
                                + Novo horário
                            </button>
                        </legend>
                                
                        {scheduleItems.map( (scheduleItem, index) => {
                            return(
                                <div key={scheduleItem.week_day} className="schedule-item">
                                <Select 
                                    name="week_day" 
                                    label="Dia da semana" 
                                    value={scheduleItem.week_day}
                                    onChange={e => setScheduleItemsValue(index, 'week_day', e.target.value)}
                                    options={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda-feira' },
                                        { value: '2', label: 'Terça-feira' },
                                        { value: '3', label: 'Quarta-feira' },
                                        { value: '4', label: 'Quinta-feira' },
                                        { value: '5', label: 'Sexta-feira' },
                                        { value: '6', label: 'Sábado' },
                                        
                                    ]}
        
                                />
                                <Input 
                                    name="from" 
                                    label="Das" 
                                    type="time" 
                                    value={scheduleItem.from}
                                    onChange={e => setScheduleItemsValue(index, 'from', e.target.value)} 
                                />

                                <Input 
                                    name="to" 
                                    label="Até" 
                                    type="time" 
                                    value={scheduleItem.to}
                                    onChange={e => setScheduleItemsValue(index, 'to', e.target.value)} 
                                />

                            </div>
                            );
                        })}

                    </fieldset>
                    
                    <footer>
                        <p>
                            <img src={waringIcon} alt="Aviso Importante"/>
                            Imporetante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;