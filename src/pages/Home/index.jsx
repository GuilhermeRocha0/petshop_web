import React, { useState, useEffect } from "react";
import './home.css'
import { Link } from "react-router-dom";
import BotaoTema from "../../components/BotaoTema";

const Home = () => {

  const [menuActive, setMenuActive] = useState(false);

  const handleMobileMenu = () => {
    setMenuActive(!menuActive);
  };

  const [temaEscuro, setTemaEscuro] = useState(false);

useEffect(() => {
  const body = document.body;
  if (temaEscuro) {
    body.classList.add('tema-escuro');
    body.classList.remove('tema-claro');
  } else {
    body.classList.add('tema-claro');
    body.classList.remove('tema-escuro');
  }
}, [temaEscuro]);

const alternarTema = () => {
  setTemaEscuro(!temaEscuro);
};

  return (
    <div>
      <header className="ho-header">
        <nav id="navbar">
          <i className="fa-solid fa-paw" id="nav_logo">
            <span> </span>Pet <span>da</span> Carla
          </i>

          <ul id="nav_list">
            <li className="nav-item">
              <Link to="/loja">Ecomerce</Link>
            </li>
            <li className="nav-item">
              <Link to="/agendamentos">Agendamentos</Link>
            </li>
            <li className="nav-item active">
              <Link>Sobre nós</Link>
            </li>
          </ul>

          <Link to="/cadastrar" className="btn-default">Cadastre-se</Link>

          <button id="mobile_btn" onClick={handleMobileMenu}>
            <i className={menuActive ? 'fa fa-x' : 'fa fa-bars'}></i>
          </button>
        </nav>

        
      </header>

      <main id="content">
        
        <section id="home">
          <div className="shape"></div>
          <div id="cta">
            <h1 className="ho-title">
              🐾O cuidado que seu pet merece, com carinho de
              <span> Verdade!</span>
              <BotaoTema alternarTema={alternarTema} temaEscuro={temaEscuro} />

            </h1>

            <p className="description">
              Entregamos alegria, conforto e produtos de qualidade direto pra você e seu melhor amigo. <br /> Aqui no Pet da Carla, cada latido importa! ❤️🐶
            </p>

            <div id="cta_buttons" style={{ display: "flex", gap: "20px" }}>
            <Link to="/agendamentos"><a href="#" className="btn-default">
                Agendar já
                
              </a></Link>

              <a href="tel:+55555555555555" id="phone_button">
                <button className="btn-default">
                  <i className="fa-solid fa-phone" style={{ fontSize: "16px" }}></i>
                </button>
                (11)94076-4312
              </a>
            </div>

            <div className="social-media-buttons">
              <a href="">
                <i className="fa-brands fa-whatsapp" id="zap"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-instagram" id="insta"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-facebook" id="face"></i>
              </a>
            </div>
          </div>

          <div id="banner">
            <img src="./images/alpha.png" alt="Banner" />
          </div>
        </section>

        <section id="menu">
          <h2 className="section-title">Serviços</h2>
          <h3 className="section-subtitle">disponíveis</h3>

          <div id="dishes">
            {/* Repetir este bloco para cada serviço */}
            {[
              {
                img: "./images/banhoo.png",
                title: "🛁 Banho",
                description: `Seu pet limpinho, cheiroso e feliz! 💦\ntomamos todo o cuidado que seu bichinho merece.`,
              },
              {
                img: "./images/tosauu.png",
                title: "✂️ Tosa",
                description: `Estilo saúde e conforto para seu pet! ✨\nTosas higiênicas, na tesoura ou máquina, com carinho e profissionais. `,
              },
              {
                img: "./images/ecomercee.png",
                title: "🛒 Loja Online",
                description: `Tudo para seu pet com carinho! 🐾 \nRações, brinquedos, acessórios e mais, com entrega rápida e segura.`,
              },
              {
                img: "./images/lojaa.png",
                title: "🏪 Loja Física",
                description: `Estamos esperando por você 🐶🎈\nAmbiente acolhedor e uma variedade de produtos esperando por você.`,
              },
            ].map((item, index) => (
              <div className="dish" key={index}>
                <div className="dish-heart">
                  <i className="fa-solid fa-dog"></i>
                </div>

                <img src={item.img} className="dish-image" alt={item.title} />

                <h3 className="dish-title">{item.title}</h3>

                <span className="dish-description">{item.description}</span>

                <div className="dish-rate">
                  {[...Array(5)].map((_, i) => (
                    <i className="fa-solid fa-star" key={i}></i>
                  ))}
                  <span>(500+)</span>
                </div>

                <div className="sih-price">
                  
                  
                  <Link to="/agendamentos">
                  <button className="btn-default">
                    <i style={{ fontSize: "16px" }}>agende agora</i>
                  </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials">
          <img src="./images/hero.png" id="testimonials_chef" alt="Chef" />

          <div id="testimonials_content">
            <h2 className="section-title">Depoimentos</h2>
            <h3 className="section-subtitle">O que os clientes falam sobre nós</h3>

            <div id="feedbacks">
              {[
                {
                  name: "Bruno Costa",
                  img: "./images/rosto1.png",
                  text: `“Equipe muito atenciosa, ambiente limpo e meu cachorrinho ficou super tranquilo durante a tosa. Com certeza virei cliente fiel!”`,
                },
                {
                  name: "Lucas Fernandes",
                  img: "./images/rosto2.png",
                  text: `“Levo meu cachorro no Pet da Carla há meses e o atendimento é sempre incrível! Ele adora o banho e volta super cheiroso. Recomendo demais!”`,
                },
              ].map((item, index) => (
                <div id="feedback" key={index}>
                  <img src={item.img} className="feedback-avatar" alt={item.name} />
                  <div className="feedback-content">
                    <p>
                      {item.name}
                      <span>
                        {[...Array(5)].map((_, i) => (
                          <i className="fa-solid fa-star" key={i}></i>
                        ))}
                      </span>
                    </p>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="btn-default-fi">Ver mais avaliações</button>

          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>© 2025 Pet da Carla — Todos os direitos reservados.</p>

          <p>
            <i className="fa-solid fa-bone"></i> Banho e Tosa • Loja Online • Loja Física
          </p>

          <p>
            <i className="fa-solid fa-location-dot"></i> Rua salgato, 123 - São Paulo, SP
          </p>

          <p>
            <i className="fa-solid fa-phone"></i> (11) 94076-4312
          </p>

          <p>
            <i className="fa-solid fa-envelope"></i>{" "}
            <a href="mailto:contato@petdacarla.com.br">contato@petdacarla.com.br</a>
          </p>

          <p>Siga a gente nas redes sociais:</p>

          <div className="social-footer">
            <a href="#"><i className="fa-brands fa-facebook"></i> PET_CARLA_OFC</a>
            <a href="#"><i className="fa-brands fa-instagram"></i> PET_CARLA_OFC</a>
            <a href="#"><i className="fa-brands fa-whatsapp"></i> (11) 94076-4312</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
