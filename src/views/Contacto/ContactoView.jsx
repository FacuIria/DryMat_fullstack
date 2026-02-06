import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

import Navbar from '../../components/common/NavBar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import Modal from '../../components/common/Modal/Modal';
import WhatsappButton from '../../components/common/WhatsappButton/whatsappButton';

import './ContactoView.css';

function ContactoView() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    motivo: 'Contacto general',
    asunto: '',
    mensaje: ''
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    isSuccess: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nombre.trim() ||
      !formData.email.trim() ||
      !formData.telefono.trim() ||
      !formData.asunto.trim() ||
      !formData.mensaje.trim()
    ) {
      setModalContent({
        title: 'Error',
        message: 'Por favor, completá todos los campos obligatorios.',
        isSuccess: false
      });
      setModalOpen(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setModalContent({
        title: 'Error',
        message: 'Por favor, ingresá un email válido.',
        isSuccess: false
      });
      setModalOpen(true);
      return;
    }

    const templateParams = {
      from_name: formData.nombre,
      from_email: formData.email,
      phone: formData.telefono,
      subject: formData.asunto,
      motivo: formData.motivo,
      message: formData.mensaje,
      to_email: 'Drymatsoluciones@gmail.com'
    };

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      );

      setModalContent({
        title: 'Éxito',
        message: 'Mensaje enviado con éxito',
        isSuccess: true
      });
      setModalOpen(true);

      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        motivo: 'Contacto general',
        asunto: '',
        mensaje: ''
      });
    } catch (error) {
      setModalContent({
        title: 'Error',
        message:
          'Hubo un problema al enviar tu mensaje. Por favor, intentá nuevamente o contactanos directamente a Drymatsoluciones@gmail.com',
        isSuccess: false
      });
      setModalOpen(true);
    }
  };

  return (
    <div className="contacto-view">
      <Navbar />

      <div className="contacto-container">
        <h1>Contacto</h1>
        <p className="contacto-subtitle">
          ¿Tenés alguna consulta? Completá el formulario y nos pondremos en contacto con vos a la brevedad.
        </p>

        <form onSubmit={handleSubmit} className="contacto-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nombre">
                Nombre <span className="required">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="motivo">
                Motivo de Contacto <span className="required">*</span>
              </label>
              <select
                id="motivo"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                required
              >
                <option value="Contacto general">Contacto general</option>
                <option value="Consulta comercial">Consulta comercial</option>
                <option value="Soporte técnico">Soporte técnico</option>
                <option value="Cotización">Cotización</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="asunto">
                Asunto <span className="required">*</span>
              </label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="telefono">
                Teléfono <span className="required">*</span>
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="mensaje">
                Mensaje <span className="required">*</span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Enviar Mensaje
            </button>
          </div>
        </form>
      </div>
      <WhatsappButton />

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (modalContent.isSuccess) {
            navigate('/');
          }
        }}
        title={modalContent.title}
        message={modalContent.message}
      />

      <Footer />
    </div>
  );
}

export default ContactoView;
