import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f0f0f7',
    },
    groupFilter: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    textFilter: {
        color: '#c1bccc',
        fontFamily: 'Poppins_400Regular',
        marginRight: 5
    },
    teacherList: {
        marginTop: -40,
        
    },
    searchForm: {
        marginBottom: 25,
    },
    label: {
        color: '#d4c2ff',
        fontFamily: 'Poppins_400Regular',
    },
    inputGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    inputBlock:{
        width: '48%'
    },
    input: {
        height: 54,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginTop: 4,
        marginBottom: 16,
    },
    submitButton: {
        backgroundColor: '#04d361',
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButtonText: {
      color: '#fff',
      fontFamily: 'Archivo_700Bold',
      fontSize: 16,
      marginLeft: 16,
    }

    
})

export default styles;