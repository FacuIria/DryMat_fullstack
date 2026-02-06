import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/common/NavBar/Navbar";
import Footer from "../../components/common/Footer/Footer";
import WhatsappButton from "../../components/common/WhatsappButton/whatsappButton";
import "./FAQ.css";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchFaqs } from "../../store/slices/faqsSlice";

const FAQ = () => {
  const dispatch = useAppDispatch();
  const faqsState = useAppSelector((s) => s.faqs) || {};
  const items = faqsState.items || [];
  const status = faqsState.status || "idle";

  const [openIndexes, setOpenIndexes] = useState([]);

  // Tu contenido actual como fallback
  const fallbackFaqs = useMemo(
    () => [
      {
        question: "¿Qué es DryMat?",
        answer:
          "DryMat es una empresa especializada en alfombras de goma premium para mingitorios. Nuestro producto estrella, Pishing Mat, se destaca por incluir un arco y una pelota, creando una experiencia interactiva y única que transforma la dinámica de los baños.",
      },
      {
        question: "¿Qué incluye cada Pishing Mat?",
        answer:
          "Cada Pishing Mat incluye: alfombra de goma de alta calidad antideslizante, un arco miniatura integrado, una pelota especialmente diseñada, y sistema de fijación para garantizar estabilidad.",
      },
      {
        question: "¿En qué lugares están instaladas las Pishing Mat?",
        answer:
          "Nuestras Pishing Mat están instaladas en lugares de prestigio como el Aeropuerto Internacional de Beijing en China, la Universidad de San Andrés en Argentina, centros comerciales de alto tráfico, hoteles de categoría, y oficinas corporativas en más de 10 países.",
      },
      {
        question: "¿Cuál es la durabilidad de las alfombras?",
        answer:
          "Nuestras alfombras están fabricadas con goma de primera calidad, diseñadas para soportar uso intensivo. Con el mantenimiento adecuado, tienen una vida útil de 3 a 5 años incluso en espacios de alto tráfico.",
      },
      {
        question: "¿Cómo se limpian y mantienen?",
        answer:
          "Las Pishing Mat son muy fáciles de mantener. Se limpian con agua y jabón neutro, y su material antiadherente evita la acumulación de suciedad. Recomendamos limpieza diaria con trapeador húmedo.",
      },
      {
        question: "¿Las alfombras son antideslizantes?",
        answer:
          "Sí, todas nuestras alfombras cuentan con base antideslizante que garantiza estabilidad y seguridad. El material de goma proporciona excelente tracción incluso en superficies húmedas.",
      },
      {
        question: "¿Hacen envíos internacionales?",
        answer:
          "Sí, realizamos envíos a todo el mundo. Ya tenemos clientes en más de 10 países. Los tiempos y costos de envío varían según el destino. Contactanos para obtener una cotización personalizada.",
      },
      {
        question: "¿Qué medidas tienen las Pishing Mat?",
        answer:
          "Nuestras Pishing Mat vienen en medida estándar de 60cm x 45cm, ideal para la mayoría de los mingitorios. También ofrecemos medidas personalizadas para proyectos especiales.",
      },
      {
        question: "¿Hacen descuentos por cantidad?",
        answer:
          "Sí, ofrecemos descuentos especiales para compras al por mayor, proyectos corporativos e institucionales. Contactanos con los detalles de tu proyecto para recibir una cotización personalizada.",
      },
      {
        question: "¿Cómo puedo contactarlos?",
        answer:
          "Podés contactarnos a través de nuestro formulario de contacto en la web, por email a Drymatsoluciones@gmail.com, o por teléfono al +54 11 7620-5555.",
      },
      {
        question: "¿Dónde están ubicados?",
        answer:
          "Nuestra sede central se encuentra en Buenos Aires, Argentina. Desde aquí coordinamos envíos a todo el país y al exterior.",
      },
      {
        question: "¿Tienen garantía?",
        answer:
          "Sí, todas nuestras alfombras cuentan con garantía de 12 meses contra defectos de fabricación. Si tenés algún problema con tu producto, contactanos y lo solucionaremos.",
      },
    ],
    []
  );

  useEffect(() => {
    if (status === "idle") dispatch(fetchFaqs());
  }, [dispatch, status]);

  // Normalizamos API: acepta [{question,answer}] o [{q,a}]
  const apiFaqs =
    Array.isArray(items) && items.length
      ? items.map((f) => ({
          question: f.question ?? f.q ?? "",
          answer: f.answer ?? f.a ?? "",
        }))
      : [];

  const faqsToRender = status === "succeeded" && apiFaqs.length ? apiFaqs : fallbackFaqs;

  const handleToggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="faq-view">
      <Navbar />
      <main className="faq-content">
        <h1>Preguntas Frecuentes</h1>

        <div className="faq-list">
          {faqsToRender.map((faq, index) => (
            <div className="faq-item" key={index} style={{ marginBottom: "6px" }}>
              <button
                className="faq-question"
                onClick={() => handleToggle(index)}
                aria-expanded={openIndexes.includes(index)}
                aria-controls={`faq-answer-${index}`}
                style={{
                  background: "none",
                  border: "none",
                  padding: "0",
                  margin: "0",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3 style={{ margin: 0 }}>{faq.question}</h3>
                <span
                  style={{
                    display: "inline-block",
                    transition: "transform 0.3s",
                    transform: openIndexes.includes(index) ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                  aria-hidden="true"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <polyline
                      points="8 10 12 14 16 10"
                      fill="none"
                      stroke="var(--green-primary)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {openIndexes.includes(index) && (
                <p id={`faq-answer-${index}`} style={{ marginTop: "18px", marginBottom: "0" }}>
                  {faq.answer}
                </p>
              )}

              {index !== faqsToRender.length - 1 && (
                <div className="faq-divider" style={{ margin: "0.1px 0" }} />
              )}
            </div>
          ))}
        </div>
      </main>
      <WhatsappButton />
      <Footer />
    </div>
  );
};

export default FAQ;
