import { Link } from 'react-router-dom';

import Navbar from '../../components/common/NavBar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import WhatsappButton from '../../components/common/WhatsappButton/whatsappButton';

import './HomeView.css';
import sanAndresImg from '../../assets/banioUdesa.jpeg';

const HomeView = () => {
  return (
    <div className="home-view">
      <Navbar />

      <main className="home-content">
        {/* HERO */}
        <section className="hero-section">
          <h1>DryMat</h1>
          <p>
            Alfombras de goma para mingitorios: higiene, diseño y funcionalidad
            para baños de alto tránsito.
          </p>
        </section>

        {/* INTRO */}
        <section className="intro-section">
          <h2>¿Quiénes somos?</h2>
          <p>
            En <strong>DryMat</strong> desarrollamos alfombras de goma diseñadas
            específicamente para mingitorios, con el objetivo de mejorar la higiene,
            reducir salpicaduras y optimizar la limpieza.
          </p>
          <p>
            Nuestros productos combinan <strong>funcionalidad, durabilidad y diseño</strong>,
            ofreciendo una solución práctica tanto para espacios comerciales como institucionales.
          </p>
        </section>

        {/* DIFERENCIADOR */}
        <section className="diferenciador-section">
          <h2>¿Qué nos diferencia?</h2>

          <div className="diferenciador-content">
            <div className="diferenciador-item">
              <h3>Higiene real</h3>
              <p>
                Reduce salpicaduras y ayuda a mantener el baño limpio por más tiempo.
              </p>
            </div>

            <div className="diferenciador-item">
              <h3>Material premium</h3>
              <p>
                Goma resistente, antideslizante y preparada para uso intensivo.
              </p>
            </div>

            <div className="diferenciador-item">
              <h3>Fácil mantenimiento</h3>
              <p>
                Limpieza simple con agua y jabón neutro. Ideal para alto tráfico.
              </p>
            </div>
          </div>
        </section>

        {/* CLIENTES / INSTALACIONES */}
        <section className="clientes-section">
          <h2>Nuestro producto en acción</h2>
          <p>
            Conocé cómo se ve instalado en un entorno real.
          </p>

          <div className="clientes-grid">
            <div className="cliente-item">
              <img
                src={sanAndresImg}
                alt="Instalación de DryMat en mingitorio"
              />
              <h3>Instalación real</h3>
              <p>Ejemplo de colocación en baño institucional.</p>
            </div>

            <div className="cliente-item">
              <div className="cliente-placeholder">Próximamente</div>
              <h3>Más casos</h3>
              <p>Sumaremos más fotos y casos de uso.</p>
            </div>
          </div>
        </section>

        {/* OBJETIVO */}
        <section className="objetivo-section">
          <h2>Nuestro objetivo</h2>
          <p>
            Mejorar la experiencia en baños públicos y privados con una solución
            simple, efectiva y duradera.
          </p>
          <p>
            Si estás buscando elevar el estándar de higiene en tu espacio, DryMat
            es una opción pensada para uso real.
          </p>
        </section>

        {/* CTA */}
        <section className="contacto-cta">
          <h2>¿Querés una cotización?</h2>
          <p>
            Escribinos por WhatsApp o completá el formulario de contacto y te respondemos a la brevedad.
          </p>

          <Link to="/contacto" className="btn-contacto">
            Ir a Contacto
          </Link>
        </section>
      </main>

      <WhatsappButton />
      <Footer />
    </div>
  );
};

export default HomeView;
