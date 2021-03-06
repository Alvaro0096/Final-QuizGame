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
        pregunta: 'Durante la segunda guerra mundial el Reich Alem??n, el Reino de Italia y el Imperio de Jap??n firmaron un pacto formalizando la alianza del Eje. ??C??mo se llam?? este pacto?',
        respuestas: [
            {text: 'Pacto Tripartito', correct: true},
            {text: 'Pacto de Acero', correct: false},
            {text: 'Pacto del Eje', correct: false},
            {text: 'Pacto Roma, Tokyo, Berl??n', correct: false},
        ],
        mensaje: 'La creciente tensi??n en el Pac??fico llev?? a que finalmente el gobierno japon??s se aviniera a firmar el 27 de septiembre de 1940 el denominado Pacto Tripartito. Por ??l, Jap??n reconoc??a el liderazgo de Alemania e Italia en Europa y las dos potencias fascistas aceptaban la hegemon??a nipona en Asia.'
    },
    {
        pregunta: 'A lo largo de la Historia de la Humanidad siempre han aparecido pueblos o culturas que se han extendido sobre el territorio, conquistando regiones y expandiendo su influencia cultural, pol??tica, econ??mica y militar. As?? se han formado los llamados imperios. ??Cu??l de estos imperios es considerado como el m??s extenso de la historia?',
        respuestas: [
            {text: 'Imperio Mongol', correct: false},
            {text: 'Imperio Espa??ol', correct: false},
            {text: 'Imperio Britanico', correct: true},
            {text: 'Imperio Romano', correct: false}
        ],
        mensaje: 'El Imperio Brit??nico, con sus numerosas colonias, fue con mucho el m??s grande de la historia . Sus territorios se encuentran en todos los continentes y en todos los oc??anos. En 1921, dominaba alrededor de 1/4 de la poblaci??n mundial (m??s de 500 millones de personas), o el 40% de la superficie del planeta (casi 33 millones de km??).'
    },
    {
        pregunta: 'En aerodin??mica, la barrera del sonido fue considerada un l??mite f??sico que imped??a que objetos de gran tama??o se desplazaran a velocidad supers??nica. ??Cu??l fue el primer objeto artificial en romper este l??mite?',
        respuestas: [
            {text: 'El avi??n', correct: false},
            {text: 'El l??tigo', correct: true},
            {text: 'La bala', correct: false},
            {text: 'El cohete', correct: false},
        ],
        mensaje: 'Al lanzar el l??tigo, aplicamos al extremo del mango una gran energ??a. Esta se desplaza por toda la superficie como una onda en movimiento. Como la energ??a depende de la masa y la velocidad, y el l??tigo es cada vez m??s delgado, la energ??a gana velocidad conforme se acerca al extremo. Al final, el l??tigo se mueve tan deprisa que rompe la barrera del sonido y provoca as?? su inconfundible chasquido, que no es otra cosa que un estallido s??nico.'
    },
    {
        pregunta: 'Religi??n suele definirse como un sistema cultural de determinados comportamientos y pr??cticas, cosmovisiones, ??ticas, textos, lugares sagrados, profec??as u organizaciones que relacionan la humanidad a elementos sobrenaturales, trascendentales o espirituales. ??Cu??l de estas religiones es considerada la m??s antigua?',
        respuestas: [
            {text: 'Budismo', correct: false},
            {text: 'Juda??smo', correct: false},
            {text: 'Cristianismo', correct: false},
            {text: 'Hinduismo', correct: true}
        ],
        mensaje: 'El hinduismo es una religi??n (dharma) ampliamente practicada en el Sur de Asia. Los hinduistas creen que la suya es la religi??n m??s antigua del mundo, y se refieren a ella como ??sanatana dharma?? (religi??n eterna). Los eruditos consideran al hinduismo como una fusi??n o s??ntesis de varias culturas y tradiciones indias, con diversas ra??ces y sin ning??n fundador. El hinduismo temprano tiene sus or??genes en la civilizaci??n del valle del Indo, que existi?? alrededor de 4.500-5.000 a. C. a 1.800 a. C.'
    },
    {
        pregunta: 'La segunda guerra mundial fue el conflicto b??lico m??s devastador en la historia de la humanidad. ??Cu??l fue la batalla con mayores bajas del conflicto?',
        respuestas: [
            {text: 'Batalla de Las Ardenas', correct: false},
            {text: 'Batalla de Berl??n', correct: false},
            {text: 'Batalla de Stalingrado', correct: true},
            {text: 'Batalla de Normand??a', correct: false}
        ],
        mensaje: 'La batalla de Stalingrado fue un inmenso enfrentamiento b??lico entre el Ej??rcito Rojo de la Uni??n Sovi??tica y la Wehrmacht de la Alemania nazi y sus aliados del Eje por el control de la ciudad sovi??tica de Stalingrado, actual Volgogrado, entre el 23 de agosto de 1942 y el 2 de febrero de 1943. La batalla se desarroll?? en el transcurso de la invasi??n alemana de la Uni??n Sovi??tica, en el marco de la Segunda Guerra Mundial. Con bajas estimadas en m??s de dos millones de personas entre soldados de ambos bandos y civiles sovi??ticos, la batalla de Stalingrado es considerada la m??s sangrienta en la historia de la humanidad.'
    },
    {
        pregunta: 'Al finalizar la segunda guerra mundial dos pa??ses surgieron como las nuevas Super Potencias mundiales. ??Cu??les eran estos pa??ses?',
        respuestas: [
            {text: 'USA y URSS', correct: true},
            {text: 'Reino Unido y USA', correct: false},
            {text: 'Reino Unido y URSS', correct: false},
            {text: 'China y URSS', correct: false}
        ],
        mensaje: 'La Guerra Fr??a fue un enfrentamiento pol??tico, econ??mico, social, ideol??gico, militar e informativo iniciado tras finalizar la Segunda Guerra Mundial entre el bloque Occidental (occidental-capitalista), liderado por los Estados Unidos, y el bloque del Este (oriental-comunista), liderado por la Uni??n Sovi??tica.'
    },
    {
        pregunta: 'Las monta??as m??s altas del mundo estan situadas en Asia concentradas en las cordilleras del Himalaya y el Karak??rum. De hecho, las ??nicas que superan los 7.000 metros est??n all??. ??Cu??l de estas es la monta??a m??s alta?',
        respuestas: [
            {text: 'Everest', correct: true},
            {text: 'Kanchenjunga', correct: false},
            {text: 'Lhotse', correct: false},
            {text: 'Makalu', correct: false},
        ],
        mensaje: 'El Monte Everest se encuentra en la cordillera del Himalaya, entre China y Nepal. Mide 8.848 metros de altura sobre el nivel del mar y debe su nombre a la Royal Geographical Society, que en 1865 escuch?? a un top??grafo brit??nico de la India llamado Andrew Waugh que decidi?? ponerle el nombre de su antecesor, sir George Everest.'
    },
    {
        pregunta: 'En la novela 1984 de George Orwell, Ingsoc es el ??nico partido pol??tico de Ocean??a, un superestado totalitario. ??Qu?? significa Ingsoc?',
        respuestas: [
            {text: 'Inglaterra Socialista', correct: false},
            {text: 'Sociedad Inglesa', correct: false},
            {text: 'Socialismo Ingl??s', correct: true},
            {text: 'Socialistas Ingleses', correct: false},
        ],
        mensaje: 'Ingsoc, acr??nimo de socialismo ingl??s, es el t??rmino del idioma ficticio neolengua con el que se denomina a la ideolog??a del partido gobernante en la novela 1984 de George Orwell. En dicho libro, el Ingsoc no es s??lo el nombre del partido pol??tico que dirige con mano de hierro los destinos del Estado totalitario intercontinental de Ocean??a, una de las tres porciones del mundo en la novela, sino que tambi??n de su propia ideolog??a.'
    },
    {
        pregunta: 'En qu??mica, se denomina gases nobles o gases inertes a un conjunto de elementos qu??micos que conforman el grupo 18 (VIIIA) de la Tabla Peri??dica de los elementos. ??Cu??les de estos elementos pertenecen a esta categor??a?',
        respuestas: [
            {text: 'Hidr??geno, Ox??geno, Nitr??geno', correct: false},
            {text: 'Hidr??geno, Helio, F??sforo', correct: false},
            {text: 'Helio, Ox??geno, Xen??n', correct: false},
            {text: 'Helio, Ne??n, Xen??n', correct: true},
        ],
        mensaje: 'Los gases nobles son un grupo de elementos qu??micos con propiedades muy similares: por ejemplo, bajo condiciones normales, son gases monoat??micos inodoros, incoloros y presentan una reactividad qu??mica muy baja. Los siete gases son helio (He), ne??n (Ne), arg??n (Ar), kript??n (Kr), xen??n (Xe), el radiactivo rad??n (Rn) y el sint??tico oganes??n (Og).'
    },
    {
        pregunta: 'El sistema anglosaj??n de unidades es un conjunto de unidades de medida diferentes a las del Sistema m??trico decimal, que se utilizan actualmente como medida principal en los Estados Unidos y el Reino Unido (antiguamente). ??Qu?? unidades de longitud pertenecen a este sistema?',
        respuestas: [
            {text: 'Onza, Pie, Acre, Cuarto', correct: false},
            {text: 'Pulgada, Pie, Yarda, Milla', correct: true},
            {text: 'Acre, Onza, Yarda, Milla', correct: false},
            {text: 'Milla, Dracma, Onza, Cuarto', correct: false},
        ],
        mensaje: 'El sistema para medir longitudes en los Estados Unidos se basa en la pulgada, el pie, la yarda y la milla. Cada una de estas unidades tiene dos definiciones ligeramente distintas, lo que ocasiona que existan dos diferentes sistemas de medici??n. Una pulgada de medida internacional mide exactamente 25,4 mm (por definici??n), mientras que una pulgada de agrimensor de Estados Unidos se define para que 39,37 pulgadas sean exactamente un metro.'
    },
    {
        pregunta: 'El tarot es una pr??ctica adivinatoria que se realiza mediante una baraja de 78 cartas compuestas por diferentes arcanos. Estas se dividen en arcanos mayores (22 cartas) y arcanos menores (56 cartas). ??Cu??l de estos arcanos mayores est?? asociado al caos?',
        respuestas: [
            {text: 'La Torre', correct: true},
            {text: 'El Juicio', correct: false},
            {text: 'El Colgado', correct: false},
            {text: 'La Emperatriz', correct: false},
        ],
        mensaje: 'Tradicionalmente el tarot asocia la Torre con el caos, la cat??strofe y la ruina. La Torre de Babel que es destruida por tener cimientos d??biles (la arrogancia). En general, la Torre representa la "ira divina" con el rayo destrozando lo construido y suele interpretarse que vaticina desastres y ruina. Sin embargo, su alegorismo m??s positivo es que la Torre representa las fuerzas divinas impulsando a la persona, sac??ndola de su comodidad en la Torre de Marfil para que pueda enfrentarse al mundo, crecer y evolucionar.'
    },
    {
        pregunta: 'Los bizantinos de la Edad Media empleaban una sustancia incendiaria con frecuencia en batallas navales, el mismo representaba una ventaja tecnol??gica, y fue responsable de varias importantes victorias militares. ??C??mo se llamaba esta sustancia?',
        respuestas: [
            {text: 'Fuego Naval', correct: false},
            {text: 'Gran Fuego Bizantino', correct: false},
            {text: 'Fuego Constantino', correct: false},
            {text: 'Fuego Griego', correct: true},
        ],
        mensaje: 'El Fuego griego fue un arma incendiaria utilizada por el Imperio Bizantino en numerosas batallas navales entre los siglos VII y XIII, capaz de arder sobre el agua o incluso en contacto con ella, y extremadamente dif??cil de apagar. Los ingenieros navales bizantinos dotaron a los barcos de dispositivos hidr??ulicos que, accionados por una bomba de mano, regaban con fuego la cubierta y las velas de los barcos enemigos.'
    }
]

