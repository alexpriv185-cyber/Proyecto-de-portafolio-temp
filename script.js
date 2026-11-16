let menuVisible = false;
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}

function seleccionar(){

    document.getElementById("nav").classList = "";
    menuVisible = false;
}

function efectoHabilidades(){
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distancia_skills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("JAVA");
        habilidades[3].classList.add("PYTHON");
        habilidades[4].classList.add("KRITA");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
    }
}



window.onscroll = function(){
    efectoHabilidades();
}



var SUPABASE_URL = "https://jfhjhqmitapjmqypyixw.supabase.co";   
var SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmaGpocW1pdGFwam1xeXB5aXh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4NTg4OTcsImV4cCI6MjExMDQzNDg5N30.THcXenOleESdKAFzsxdjX2zHQ673twXK9cXfVTcDANk";             

var formContacto = document.getElementById("formContacto");
if(formContacto){
    formContacto.addEventListener("submit", function(e){
        e.preventDefault();
        var estado = document.getElementById("estadoContacto");
        function mostrar(texto, ok){
            estado.textContent = texto;
            estado.className = "estado-contacto " + (ok ? "ok" : "error");
        }
        var datos = new FormData(formContacto);


        if(datos.get("web")){
            mostrar("Tu mensaje fue enviado correctamente.", true);
            formContacto.reset();
            return;
        }

        var mensaje = {
            nombre: datos.get("nombre").trim(),
            telefono: datos.get("telefono").trim() || null,
            correo: datos.get("correo").trim(),
            tema: datos.get("tema").trim(),
            mensaje: datos.get("mensaje").trim()
        };

        if(!mensaje.nombre || !mensaje.correo || !mensaje.tema || !mensaje.mensaje){
            mostrar("Completa todos los campos obligatorios.", false);
            return;
        }
        if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mensaje.correo)){
            mostrar("El correo no es valido.", false);
            return;
        }
        if(SUPABASE_URL.indexOf("TU-PROYECTO") !== -1){
            mostrar("Falta configurar SUPABASE_URL y SUPABASE_KEY en script.js.", false);
            return;
        }

        estado.className = "estado-contacto";
        estado.textContent = "Enviando...";
        fetch(SUPABASE_URL + "/rest/v1/contactos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "apikey": SUPABASE_KEY,
                "Authorization": "Bearer " + SUPABASE_KEY,
                "Prefer": "return=minimal"
            },
            body: JSON.stringify(mensaje)
        })
        .then(function(respuesta){
            if(respuesta.ok){
                mostrar("¡Gracias! Tu mensaje fue enviado correctamente.", true);
                formContacto.reset();
            }else{
                mostrar("No se pudo guardar el mensaje. Intenta nuevamente.", false);
            }
        })
        .catch(function(){
            mostrar("No se pudo conectar con el servidor. Revisa tu conexion a internet.", false);
        });
    });
}
