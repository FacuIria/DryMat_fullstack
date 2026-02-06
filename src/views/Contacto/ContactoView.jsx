import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import emailjs from "@emailjs/browser"; // opcional

import Navbar from "../../components/common/NavBar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import Modal from "../../components/common/Modal/Modal";
import WhatsappButton from "../../components/common/WhatsappButton/whatsappButton";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetContactState, sendContact } from "../../store/slices/contactSlice";

import "./ContactoView.css";

function ContactoView() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const contactState = useAppSelector((s) => s.contact) || {};
  const sendStatus = contactState.status || "idle";
  const sendError = contactState.error || null;

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    motivo: "Contacto general",
    asunto: "",
    mensaje: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
    isSuccess: false,
  });

  useEffect(() => {
    // Limpia estado redux cuando salís de la página
    return () => {
      dispatch(resetContactState());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validate = () => {
    if (
      !formData.nombre.trim() ||
      !formData.email.trim() ||
      !formData.telefono.trim() ||
      !formData.asunto.trim() ||
      !formData.mensaje.trim()
    ) {
      return "Por favor, completá todos los campos obligatorios.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Por favor, ingresá un email válido.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setModalContent({ title: "Error", message: validationError, isSuccess: false });
      setModalOpen(true);
      return;
    }

    // ✅ 1) Mandar a tu API (portfolio fullstack)
    const action = await dispatch(sendContact(formData));

    if (sendContact.fulfilled.match(action)) {
      setModalContent({
        title: "Éxito",
        message: "Mensaje enviado con éxito",
        isSuccess: true,
      });
      setModalOpen(true);

      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        motivo: "Contacto general",
        asunto: "",
        mensaje: "",
      });
      return;
    }

    // (Opcional) 2) fallback emailjs si aún no hay backend
    // Si querés este fallback, lo armamos con variables .env y sin hardcodear keys.

    setModalContent({
      title: "Error",
      message:
        "Hubo un problema al enviar tu mensaje. Probá nuevamente en unos minutos o escribinos por WhatsApp.",
      isSuccess: false,
    });
    setModalOpen(true);
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
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={sendStatus === "loading"}>
              {sendStatus === "loading" ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </div>

          {sendStatus === "failed" && (
            <div style={{ marginTop: "1rem", opacity: 0.85 }}>
              Error: {sendError}
            </div>
          )}
        </form>
      </div>

      <WhatsappButton />

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          if (modalContent.isSuccess) navigate("/");
        }}
        title={modalContent.title}
        message={modalContent.message}
      />

      <Footer />
    </div>
  );
}

export default ContactoView;
