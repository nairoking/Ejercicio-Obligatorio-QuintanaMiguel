const form = document.querySelector('form');
const tabla = document.querySelector('#usuarios');
const ordenar = document.querySelector('#ordenar-btn');


function mostrarMensaje(nombre, apellido, telefono) {
  const mensaje = document.createElement('div');
  mensaje.id = 'mensaje';
  mensaje.innerHTML = `<div class="mensaje-tooltip"> <p>Nombre: ${nombre} ${apellido} Telefono: ${telefono}</p> </div>`;
  document.body.appendChild(mensaje);
}
function ocultarMensaje() {
  const mensaje = document.querySelector('#mensaje');
  if (mensaje) {
    mensaje.remove();
  }
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const cantidad = document.querySelector('#cantidad').value;
  
  if (cantidad) {
    obtenerUsuarios(cantidad);
  }
});

function obtenerUsuarios(cantidad) {
  const url = `https://randomuser.me/api/?results=${cantidad}&inc=name,email,picture,gender,phone,location,registered`;
  fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => {
      mostrarUsuarios(datos.results);
      guardarUsuarios(datos.results);})
    .catch(error => console.log(error));
}
var masculinosglobal;
var femeninoglobal;

var guardados;

function guardarUsuarios(usuarios){
  const masculinos = usuarios.filter(u => u.gender === 'male');
  const femeninos = usuarios.filter(u => u.gender === 'female');

  guardados = femeninos.concat(masculinos);
  console.log("se ejecuto esto");
}


function mostrarUsuarios(usuarios) {
  const masculinos = usuarios.filter(u => u.gender === 'male');
  const femeninos = usuarios.filter(u => u.gender === 'female');
  masculinosglobal = masculinos;
  femeninoglobal = femeninos;
  const max = Math.max(masculinos.length, femeninos.length);
  tabla.innerHTML = '';
  for (let i = 0; i < max; i++) {
    const fila = document.createElement('tr');
    const celdaM = document.createElement('td');
    const celdaF = document.createElement('td');
    if (i < masculinos.length) {
      const usuario = masculinos[i];
      celdaM.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>
              <div class="usuario">
              <img src="${usuario.picture.medium}" alt="${usuario.name.first}">
              </div>
            </th>
            <th>
              <div class="usuario-info">
            <p>${usuario.name.last} ${usuario.name.first} </p>
            <p>${usuario.email}</p>
            
          </div>
            </th>
          </tr>
        </thead>
      </table>
      `;
      celdaM.addEventListener('mouseenter', () => {
        mostrarMensaje(usuario.name.first, usuario.name.last, usuario.phone);
      });
      celdaM.addEventListener('mouseleave', () => {
        ocultarMensaje();
      });
    }
    if (i < femeninos.length) {
      const usuario = femeninos[i];
      celdaF.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>
              <div class="usuario">
              <img src="${usuario.picture.medium}" alt="${usuario.name.first}"> 
              </div>
            </th>
            <th>
              <div class="usuario-info">
            <p>${usuario.name.last} ${usuario.name.first} </p>
            <p>${usuario.email}</p>
            
          </div>
            </th>
          </tr>
        </thead>
      </table>
      `;
      celdaF.addEventListener('mouseenter', () => {
        mostrarMensaje(usuario.name.first, usuario.name.last, usuario.phone);
      });
      celdaF.addEventListener('mouseleave', () => {
        ocultarMensaje();
      });
    }
    fila.appendChild(celdaM);
    fila.appendChild(celdaF);
    tabla.appendChild(fila);
  }

  const paisesSelect = document.querySelector('#paises-select');
const paises = obtenerPaisesDeUsuarios(usuarios);

  paises.forEach(pais => {
    const option = document.createElement('option');
    option.text = pais;
    paisesSelect.add(option);

  });
  paisesSelect.addEventListener('change', () => {
    filtrarUsuariosPorPais(paisesSelect.value, usuarios);
});
}

const ordenarBtn = document.querySelector('#ordenar-btn');
ordenarBtn.addEventListener('click', () => {
  console.log("llego al evento click")
  ordenarUsuariosPorApellidoYNombre(masculinosglobal, femeninoglobal);
});

const volverBtn = document.querySelector('#volver');
volverBtn.addEventListener('click', () =>{
  mostrarUsuarios(guardados);
});
  
// Ordena los usuarios por apellido y nombre
function ordenarUsuariosPorApellidoYNombre(masculinos, femeninos) {
  const compararApellidosYNombre = (a, b) => {
    const apellidoA = a.name.last.toLowerCase();
    const apellidoB = b.name.last.toLowerCase();
    const nombreA = a.name.first.toLowerCase();
    const nombreB = b.name.first.toLowerCase();

    if (apellidoA < apellidoB) {
      return -1;
    } else if (apellidoA > apellidoB) {
      return 1;
    } else if (nombreA < nombreB) {
      return -1;
    } else if (nombreA > nombreB) {
      return 1;
    } else {
      return 0;
    }
  };

  const masculinosOrdenados = masculinos.sort(compararApellidosYNombre);
  const femeninosOrdenados = femeninos.sort(compararApellidosYNombre);

 
  const oredenados = masculinosOrdenados.concat(femeninosOrdenados);
   console.log(oredenados);
  return mostrarUsuarios(oredenados) ;
}

// Obtiene un arreglo de paises de un arreglo de usuarios sin repetir
function obtenerPaisesDeUsuarios(usuarios) {

  const paises = usuarios.reduce((paises, usuario) => {
    const pais = usuario.location.country;
    if (!paises.includes(pais)) {
      paises.push(pais);
    }
    return paises;
  }, []);

  return paises;
}

// Filtra los usuarios por el país especificado
function filtrarUsuariosPorPais(pais, usuarios) {
  const filtroPorPais = usuarios.filter(usuario => usuario.location.country === pais);
  return mostrarUsuarios(filtroPorPais);
}








