// Componente para consultar el aviso de privacidad y los términos de CatTube.

import { useEffect, useState } from 'react'
import './LegalDocuments.css'

const documents = {
  privacy: {
    eyebrow: 'TU INFORMACIÓN',
    title: 'Aviso de privacidad integral',
    introduction: 'Conoce cómo CatTube utiliza y protege la información relacionada con tu perfil y tu progreso.',
    sections: [
      {
        title: '1. Identificación del proyecto',
        paragraphs: [
          'They are not pigeons – CatTube es una plataforma web progresiva (PWA) que forma parte del proyecto académico de videojuego El loquito, desarrollado en la Universidad Tecnológica de Chihuahua (UTCH).',
          'El desarrollo está a cargo de Equipo Arcoiris, integrado por Jaqueline Salazar, Ana Sofía Pérez, Moira Villalobos, Valeria Castillo, Alexandro De la Vega y Erick Aguilar.'
        ]
      },
      {
        title: '2. Datos que recopilamos',
        paragraphs: [
          'CatTube utiliza un nombre de usuario (username) proporcionado por el jugador para identificar su perfil dentro de la plataforma.',
          'También se genera y almacena información relacionada con el progreso del juego y la actividad del jugador:'
        ],
        items: [
          'Cantidad de seguidores.',
          'Cantidad de dinero virtual.',
          'Porcentaje de cohesión de la comunidad.',
          'Historial de estadísticas.',
          'Interacciones con videos, como likes, vistas, comentarios y compartidos.'
        ],
        footer: 'CatTube no solicita directamente nombres completos, domicilios particulares, números telefónicos, correos electrónicos ni contraseñas para utilizar sus funciones actuales.'
      },
      {
        title: '3. Finalidades del tratamiento',
        paragraphs: ['La información se utiliza exclusivamente para:'],
        items: [
          'Identificar al jugador dentro de CatTube.',
          'Asociar y conservar el progreso de cada jugador.',
          'Consultar y mostrar sus estadísticas.',
          'Registrar su evolución dentro del juego.',
          'Gestionar las interacciones con los videos.',
          'Permitir la consulta de información previamente almacenada cuando no existe conexión a internet.'
        ],
        footer: 'Los datos no se recopilan con fines publicitarios ni se comercializan.'
      },
      {
        title: '4. Almacenamiento de la información',
        paragraphs: [
          'CatTube utiliza una base de datos PostgreSQL para almacenar la información de los jugadores y sus estadísticas.',
          'La aplicación también utiliza el almacenamiento del navegador para conservar información de sesión, datos consultados y recursos necesarios para determinadas funciones sin conexión. La comunicación con la base de datos se realiza mediante los servicios del backend.'
        ]
      },
      {
        title: '5. Protección de la información',
        paragraphs: [
          'El equipo de desarrollo procurará implementar medidas técnicas y administrativas razonables para proteger la información contra accesos, modificaciones, pérdidas o divulgaciones no autorizadas.',
          'El acceso a la información deberá limitarse a las funciones y operaciones necesarias para el funcionamiento de la plataforma.'
        ]
      },
      {
        title: '6. Transferencia de datos',
        paragraphs: [
          'CatTube no contempla la venta ni la comercialización de la información de sus jugadores.',
          'La información se utiliza para las funciones propias del proyecto. Cualquier transferencia de datos a terceros que pudiera resultar necesaria deberá revisarse y comunicarse conforme a las disposiciones aplicables.'
        ]
      },
      {
        title: '7. Derechos de los titulares de los datos',
        paragraphs: [
          'Las personas cuyos datos sean tratados podrán solicitar información sobre el uso de sus datos y, cuando resulte aplicable, ejercer sus derechos de acceso, rectificación, cancelación y oposición (ARCO), conforme a la legislación correspondiente.',
          'Las solicitudes deberán dirigirse al responsable del tratamiento por el medio de contacto que se habilite para el proyecto. La identidad del solicitante podrá verificarse para evitar el acceso no autorizado a los datos de otro jugador.'
        ]
      },
      {
        title: '8. Conservación de la información',
        paragraphs: [
          'La información se conservará durante el tiempo necesario para mantener las funciones del proyecto y el progreso de los jugadores, considerando las necesidades académicas y técnicas de CatTube.',
          'Cuando corresponda, los datos podrán eliminarse o dejar de utilizarse de acuerdo con las solicitudes procedentes y las disposiciones aplicables.'
        ]
      },
      {
        title: '9. Cambios al aviso de privacidad',
        paragraphs: [
          'Este aviso podrá actualizarse cuando se incorporen nuevas funciones, se modifiquen los datos recopilados o cambien las prácticas de tratamiento de información.',
          'Las modificaciones se publicarán en la sección correspondiente de CatTube.'
        ]
      },
      {
        title: '10. Aceptación y consulta',
        paragraphs: [
          'El presente aviso se pone a disposición de los jugadores para informarles sobre los datos que utiliza CatTube, las finalidades de su tratamiento y las medidas generales de protección.',
          'Se recomienda consultarlo periódicamente para conocer cualquier actualización.'
        ]
      }
    ]
  },
  terms: {
    eyebrow: 'USO DE LA PLATAFORMA',
    title: 'Términos y condiciones',
    introduction: 'Estas condiciones describen las reglas generales para utilizar CatTube y sus funciones.',
    sections: [
      {
        title: '1. Aceptación de los términos',
        paragraphs: [
          'El acceso y uso de CatTube implica que el jugador conoce y acepta los presentes términos y condiciones. Si no está de acuerdo con ellos, deberá abstenerse de utilizar la plataforma.'
        ]
      },
      {
        title: '2. Descripción de la plataforma',
        paragraphs: [
          'CatTube es una aplicación web progresiva (PWA) que forma parte del proyecto académico de videojuego El loquito, desarrollado por Equipo Arcoiris.',
          'Su finalidad es permitir que los jugadores consulten e interactúen con contenido audiovisual y visualicen información relacionada con su progreso dentro del juego.'
        ],
        items: [
          'Identificación del jugador mediante un nombre de usuario.',
          'Consulta e interacción con videos.',
          'Visualización de seguidores, dinero virtual y cohesión.',
          'Consulta del historial de estadísticas.',
          'Acceso a determinadas funciones sin conexión a internet.'
        ]
      },
      {
        title: '3. Registro e identificación del jugador',
        paragraphs: [
          'Para utilizar las funciones personalizadas de CatTube, el jugador deberá proporcionar un nombre de usuario (username).',
          'El jugador se compromete a utilizar un nombre de usuario apropiado y a no suplantar la identidad de otras personas. Cada nombre de usuario permite asociar el progreso y las estadísticas correspondientes a un jugador.'
        ]
      },
      {
        title: '4. Uso adecuado de la plataforma',
        paragraphs: ['El jugador se compromete a:'],
        items: [
          'Utilizar CatTube de manera responsable.',
          'No intentar acceder a información de otros jugadores sin autorización.',
          'No realizar actividades que puedan afectar el funcionamiento de la plataforma.',
          'No manipular, alterar o explotar intencionalmente los servicios de la aplicación.',
          'No utilizar la plataforma para distribuir contenido ilegal o perjudicial.',
          'No utilizar mecanismos que comprometan la seguridad o integridad de la información almacenada.'
        ]
      },
      {
        title: '5. Estadísticas y moneda virtual',
        paragraphs: [
          'Los seguidores, el dinero y la cohesión representan elementos del sistema de juego.',
          'El dinero mostrado en CatTube es una moneda virtual utilizada exclusivamente dentro del entorno de El loquito. No representa dinero real, no constituye un saldo financiero y no puede intercambiarse por dinero u otros bienes fuera del juego.',
          'Las estadísticas reflejan el progreso registrado para cada jugador y no representan resultados económicos reales.'
        ]
      },
      {
        title: '6. Contenido audiovisual e interacciones',
        paragraphs: [
          'Los videos disponibles en CatTube forman parte de las funciones de entretenimiento e interacción de la plataforma.',
          'Las acciones de dar like, consultar, comentar o compartir contenido permiten registrar la actividad del jugador y actualizar la información correspondiente a su progreso.',
          'El jugador deberá utilizar estas funciones de manera responsable y respetar los derechos de los titulares del contenido audiovisual.'
        ]
      },
      {
        title: '7. Disponibilidad del servicio',
        paragraphs: [
          'CatTube puede requerir conexión a internet para consultar o actualizar información almacenada en el servidor.',
          'Algunas funciones pueden permanecer disponibles sin conexión mediante información previamente guardada en el dispositivo. La disponibilidad puede variar dependiendo del dispositivo, navegador y estado de conexión.',
          'Debido a que CatTube forma parte de un proyecto académico en desarrollo, algunas funciones pueden modificarse, suspenderse o encontrarse temporalmente fuera de servicio.'
        ]
      },
      {
        title: '8. Propiedad intelectual',
        paragraphs: [
          'Los elementos gráficos, diseños, interfaces, nombres, recursos audiovisuales y demás materiales que formen parte de CatTube y El loquito están sujetos a los derechos de propiedad intelectual que correspondan a sus respectivos titulares.',
          'El uso de la plataforma no concede al jugador derechos de propiedad sobre dichos materiales.',
          'No está permitido copiar, modificar, distribuir o utilizar comercialmente los recursos de la plataforma sin la autorización correspondiente.'
        ]
      },
      {
        title: '9. Limitación de responsabilidad',
        paragraphs: [
          'CatTube se proporciona como parte de un proyecto académico de videojuego y puede encontrarse sujeto a modificaciones, pruebas y mejoras.',
          'Debido a su naturaleza de proyecto en desarrollo, no se garantiza la disponibilidad permanente de la plataforma ni la conservación ininterrumpida de los datos durante las etapas de desarrollo y pruebas.',
          'El equipo de desarrollo procurará mantener el funcionamiento adecuado de las funciones disponibles y corregir los errores que sean identificados.'
        ]
      },
      {
        title: '10. Modificaciones de los términos',
        paragraphs: [
          'Los presentes términos y condiciones podrán actualizarse cuando existan cambios en las funciones, características o funcionamiento de CatTube. Las modificaciones se publicarán en esta misma sección.'
        ]
      },
      {
        title: '11. Contacto',
        paragraphs: [
          'Para dudas, comentarios o aclaraciones relacionadas con el proyecto, se habilitará un medio de contacto de Equipo Arcoiris. Los datos de contacto se publicarán en esta sección una vez que el medio correspondiente se encuentre disponible.'
        ]
      },
      {
        title: '12. Aceptación final',
        paragraphs: [
          'Al utilizar CatTube, el jugador reconoce haber tenido acceso a estos términos y condiciones y acepta las disposiciones aplicables al uso de la plataforma.'
        ]
      }
    ]
  }
}

function LegalDocuments() {
  const [activeDocument, setActiveDocument] = useState(null)

  useEffect(() => {
    if (!activeDocument) return

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setActiveDocument(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [activeDocument])

  const selectedDocument = activeDocument ? documents[activeDocument] : null

  return (
    <>
      <div className="legal-links" aria-label="Información de CatTube">
        <button type="button" onClick={() => setActiveDocument('privacy')}>
          Aviso de privacidad
        </button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => setActiveDocument('terms')}>
          Términos y condiciones
        </button>
      </div>

      {selectedDocument && (
        <div
          className="legal-modal-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActiveDocument(null)
            }
          }}
        >
          <section
            className="legal-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-modal-title"
          >
            <header className="legal-modal-header">
              <div className="legal-modal-brand">
                <span className="legal-modal-brand-icon" aria-hidden="true">C</span>
                <span>CatTube</span>
              </div>

              <button
                type="button"
                className="legal-modal-close"
                onClick={() => setActiveDocument(null)}
                aria-label="Cerrar ventana"
              >
                ×
              </button>

              <span className="legal-modal-eyebrow">{selectedDocument.eyebrow}</span>
              <h2 id="legal-modal-title">{selectedDocument.title}</h2>
              <p>{selectedDocument.introduction}</p>
              <span className="legal-modal-date">Última actualización: 11 de noviembre de 2026</span>
            </header>

            <div className="legal-modal-content">
              {selectedDocument.sections.map((section, index) => (
                <article className="legal-section" key={`${activeDocument}-${index}`}>
                  <h3>{section.title}</h3>
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ))}
                  {section.items && (
                    <ul>
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.footer && <p>{section.footer}</p>}
                </article>
              ))}

              <div className="legal-modal-signature">
                <strong>They are not pigeons – CatTube</strong>
                <span>Equipo Arcoiris</span>
              </div>
            </div>

            <footer className="legal-modal-footer">
              <span>Gracias por formar parte de CatTube</span>
              <button type="button" onClick={() => setActiveDocument(null)}>
                Entendido
              </button>
            </footer>
          </section>
        </div>
      )}
    </>
  )
}

export default LegalDocuments
