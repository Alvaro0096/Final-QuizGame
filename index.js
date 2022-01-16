const comenzarBtn = document.getElementById('comenzar-btn');
const continuarBtn = document.getElementById('continuar-btn');
const contenedorPregunta = document.getElementById('contenedor-pregunta');
const txtPregunta = document.getElementById('pregunta_txt');
const botonRespuesta = document.getElementById('boton-respuesta');
const mensajeBtn = document.getElementById('mensaje-btn');
const finalizarBtn = document.getElementById('final-btn');
const puntaje = document.getElementById('score');
const quiz_final_txt = document.getElementById('quiz_final');

let score = 0;

let mezclarPregunta, preguntaActual;

comenzarBtn.addEventListener('click', comenzarJuego);

continuarBtn.addEventListener('click', () => {
    preguntaActual++
    siguientePregunta();
});

function comenzarJuego(){
    document.body.style.height = '100%';
    mezclarPregunta = preguntas.sort(() => Math.random() - .5);
    preguntaActual = 0;
    score = 0;
    puntaje.innerText = score;
    comenzarBtn.classList.add('hide');
    quiz_final_txt.classList.add('hide');
    contenedorPregunta.classList.remove('hide');
    txtPregunta.classList.remove('hide');
    botonRespuesta.classList.remove('hide');
    siguientePregunta();
}

function siguientePregunta(){
    resetearEstado();
    mostrarPregunta(mezclarPregunta[preguntaActual]);
}

function mostrarPregunta(pregunta){
    txtPregunta.innerText = pregunta.pregunta;
    mensajeBtn.innerText = pregunta.mensaje;
    pregunta.respuestas.forEach(respuestas => {
        const button = document.createElement('button');
        button.innerText = respuestas.text;
        button.classList.add('btn');
        if (respuestas.correct) {
            button.dataset.correct = respuestas.correct;
        } 
        button.addEventListener('click', seleccionarRespuesta);
        botonRespuesta.appendChild(button);
    });
}

function resetearEstado(){
    limpiarClase(document.body);
    continuarBtn.classList.add('hide');
    mensajeBtn.classList.add('hide');
    while (botonRespuesta.firstChild) {
        botonRespuesta.removeChild(botonRespuesta.firstChild);
    }
}

function seleccionarRespuesta(e){
    const botonSeleccionado = e.target;
    const correct = botonSeleccionado.dataset.correct;
    if (correct) {
        score = score + 5;
        puntaje.innerText = score;
    } else {
        score = score - 3;
        puntaje.innerText = score;
    }
    Array.from(botonRespuesta.children).forEach(button => {
        estadoClase(button, button.dataset.correct)
    })
    if (mezclarPregunta.length > preguntaActual + 1) {
        continuarBtn.classList.remove('hide');
        mensajeBtn.classList.remove('hide');
    } else {
        mensajeBtn.classList.remove('hide');
        finalizarBtn.classList.remove('hide')
        continuarBtn.classList.add('hide');
        resultadoFinal();
    }
}

function resultadoFinal(){
    finalizarBtn.addEventListener('click', () => {
        quiz_final_txt.classList.remove('hide');
        comenzarBtn.classList.remove('hide')
        txtPregunta.classList.add('hide');
        botonRespuesta.classList.add('hide');
        mensajeBtn.classList.add('hide');
        finalizarBtn.classList.add('hide');
        comenzarBtn.classList.add('separador');
        comenzarBtn.innerText = 'Volver a intentarlo';
    });
}


function estadoClase(elemento, correct){
    limpiarClase(elemento);
    if (correct) {
        elemento.classList.add('correct');
        elemento.disabled='true';
    } else {
        elemento.classList.add('wrong');
        elemento.disabled='true';
    }
}

function limpiarClase(elemento){
    elemento.classList.remove('correct');
    elemento.classList.remove('wrong');
}

const preguntas = [
    {
        pregunta: 'Durante la segunda guerra mundial el Reich Aleman, el Reino de Italia y el Imperio de Japón firmaron un pacto formalizando la alianza del Eje. ¿Cómo se llamo este pacto?',
        respuestas: [
            {text: 'Pacto Tripartito', correct: true},
            {text: 'Pacto de Acero', correct: false},
            {text: 'Pacto del Eje', correct: false},
            {text: 'Pacto Roma, Tokyo, Berlín', correct: false},
        ],
        mensaje: 'La creciente tensión en el Pacífico llevó a que finalmente el gobierno japonés se aviniera a firmar el 27 de septiembre de 1940 el denominado Pacto Tripartito. Por él, Japón reconocía el liderazgo de Alemania e Italia en Europa y las dos potencias fascistas aceptaban la hegemonía nipona en Asia.'
    },
    {
        pregunta: 'A lo largo de la Historia de la Humanidad siempre han aparecido pueblos o culturas que se han extendido sobre el territorio, conquistando regiones y expandiendo su influencia cultural, política, económica y militar. Así se han formado los llamados imperios. ¿Cúal de estos imperios es considerado como el más extenso de la historia?',
        respuestas: [
            {text: 'Imperio Mongol', correct: false},
            {text: 'Imperio Español', correct: false},
            {text: 'Imperio Britanico', correct: true},
            {text: 'Imprerio Romano', correct: false}
        ],
        mensaje: 'El Imperio Británico, con sus numerosas colonias, fue con mucho el más grande de la historia . Sus territorios se encuentran en todos los continentes y en todos los océanos. En 1921, dominaba alrededor de 1/4 de la población mundial (más de 500 millones de personas), o el 40% de la superficie del planeta (casi 33 millones de km²).'
    },
    {
        pregunta: 'En aerodinámica, la barrera del sonido fue considerada un límite físico que impedía que objetos de gran tamaño se desplazaran a velocidad supersónica. ¿Cúal fue el primer objeto artificial en romper este límite?',
        respuestas: [
            {text: 'El avión', correct: false},
            {text: 'El látigo', correct: true},
            {text: 'La bala', correct: false},
            {text: 'El cohete', correct: false},
        ],
        mensaje: 'Al lanzar el látigo, aplicamos al extremo del mango una gran energía. Esta se desplaza por toda la superficie como una onda en movimiento. Como la energía depende de la masa y la velocidad, y el látigo es cada vez más delgado, la energía gana velocidad conforme se acerca al extremo. Al final, el látigo se mueve tan deprisa que rompe la barrera del sonido y provoca así su inconfundible chasquido, que no es otra cosa que un estallido sónico.'
    },
    {
        pregunta: 'Religión suele definirse como un sistema cultural de determinados comportamientos y prácticas, cosmovisiones, éticas, textos, lugares sagrados, profecías u organizaciones que relacionan la humanidad a elementos sobrenaturales, trascendentales o espirituales. ¿Cúal de estas religiones es considerada la más antigua?',
        respuestas: [
            {text: 'Budismo', correct: false},
            {text: 'Judaísmo', correct: false},
            {text: 'Cristianismo', correct: false},
            {text: 'Hinduismo', correct: true}
        ],
        mensaje: 'El hinduismo es una religión (dharma) ampliamente practicada en el Sur de Asia. Los hinduistas creen que la suya es la religión más antigua del mundo, y se refieren a ella como «sanatana dharma» (religión eterna). Los eruditos consideran al hinduismo como una fusión o síntesis de varias culturas y tradiciones indias, con diversas raíces y sin ningún fundador. El hinduismo temprano tiene sus orígenes en la civilización del valle del Indo, que existió alrededor de 4.500-5.000 a. C. a 1.800 a. C.'
    },
    {
        pregunta: 'La segunda guerra mundial fue el conflicto bélico más devastador en la historia de la humanidad. ¿Cúal fue la batalla con mayores bajas del conflicto?',
        respuestas: [
            {text: 'Batalla de Las Ardenas', correct: false},
            {text: 'Batalla de Berlin', correct: false},
            {text: 'Batalla de Stalingrado', correct: true}
        ],
        mensaje: 'La batalla de Stalingrado fue un inmenso enfrentamiento bélico entre el Ejército Rojo de la Unión Soviética y la Wehrmacht de la Alemania nazi y sus aliados del Eje por el control de la ciudad soviética de Stalingrado, actual Volgogrado, entre el 23 de agosto de 1942 y el 2 de febrero de 1943. La batalla se desarrolló en el transcurso de la invasión alemana de la Unión Soviética, en el marco de la Segunda Guerra Mundial. Con bajas estimadas en más de dos millones de personas entre soldados de ambos bandos y civiles soviéticos, la batalla de Stalingrado es considerada la más sangrienta en la historia de la humanidad.'
    },
    {
        pregunta: 'Al finalizar la segunda gurra mundial dos paises surgieron como las nuevas Super Potencias. ¿Cuáles eran estos paises?',
        respuestas: [
            {text: 'USA y URSS', correct: true},
            {text: 'Reino Unido y USA', correct: false},
            {text: 'Reino Unido y URSS', correct: false},
            {text: 'China y URSS', correct: false}
        ],
        mensaje: 'La Guerra Fría fue un enfrentamiento político, económico, social, ideológico, militar e informativo iniciado tras finalizar la Segunda Guerra Mundial entre el bloque Occidental (occidental-capitalista), liderado por los Estados Unidos, y el bloque del Este (oriental-comunista), liderado por la Unión Soviética.'
    }
]

