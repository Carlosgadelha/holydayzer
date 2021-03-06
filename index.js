import express from 'express';

const app = express();

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "1/3/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
  ];


function FiltrarFeriados(mes){

    const feriadosFiltrados = holidays.filter(holiday => {
        
        if(new Date(holiday.date).getMonth() === mes -1){
            return holiday
        }
    })

    return feriadosFiltrados

}


function isTodayHoliday(){
    let controlador = false;
    const hoje = new Date();
    holidays.forEach(holiday => {
        if(holiday.date === hoje.toLocaleDateString('en-US')) controlador = true
    })

    return controlador ? "Sim, hoje é nome-do-feriado" : "Não, hoje não é feriado";
}

app.get('/holidays', (request, response) => {
    response.send(holidays);
});

app.get('/holidays/:mes', (request, response) => {
    const mes = parseInt(request.params.mes);
    const feriados = FiltrarFeriados(mes);
    response.send(feriados);
});

app.get('/is-today-holiday', (request, response) => {

    const feriado = isTodayHoliday();
    response.send(feriado);
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});