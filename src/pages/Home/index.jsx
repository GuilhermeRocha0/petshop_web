import React from "react";
import './home.css'

const Home = () => {
  return (
    <div>
      <header>
        <nav id="navbar">
          <i className="fa-solid fa-paw" id="nav_logo">
            Pet <span>da</span> Carla
          </i>

          <ul id="nav_list">
            <li className="nav-item active">
              <a href="#home">Ecomerce</a>
            </li>
            <li className="nav-item">
              <a href="#homeu">Agendamentos</a>
            </li>
            <li className="nav-item">
              <a href="#homer">Sobre nós</a>
            </li>
          </ul>

          <button className="btn-default">Cadastre-se</button>

          <button id="mobile_btn">
            <i className="fa-solid fa-bars"></i>
          </button>
        </nav>

        <div id="mobile_menu">
          <ul id="mobile_nav_list">
            <li className="nav-item">
              <a href="#home">Ecomerce</a>
            </li>
            <li className="nav-item">
              <a href="#homeu">Agendamentos</a>
            </li>
            <li className="nav-item">
              <a href="#homer">Sobre nós</a>
            </li>
          </ul>

          <button className="btn-default">Cadastre-se</button>
        </div>
      </header>

      <main id="content">
        <section id="home">
          <div className="shape"></div>
          <div id="cta">
            <h1 className="title">
              🐾 O cuidado que seu pet merece, com carinho de
              <span> Verdade!</span>
            </h1>

            <p className="description">
              Entregamos alegria, conforto e produtos de qualidade direto pra você e seu melhor amigo. <br /> Aqui no Pet da Carla, cada latido importa! ❤️🐶
            </p>

            <div id="cta_buttons" style={{ display: "flex", gap: "20px" }}>
              <a href="#" className="btn-default">
                ??????
              </a>

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
                img: "./images/banho2.png",
                title: "🛁 Banho",
                description: `Seu pet limpinho, cheiroso e feliz! 💦\nUtilizamos produtos específicos para cada tipo de pelagem e tomamos todo o cuidado que seu bichinho merece.`,
              },
              {
                img: "./images/tosa2.png",
                title: "✂️ Tosa",
                description: `Estilo e conforto para seu pet! ✨\nTosas higiênicas, na tesoura ou máquina, com carinho e profissionais especializados.`,
              },
              {
                img: "./images/ecomerce2.png",
                title: "🛒 Loja Online",
                description: `Rações, brinquedos, acessórios e mais, com entrega rápida e segura.`,
              },
              {
                img: "./images/loja2.png",
                title: "🏪 Loja Física",
                description: `Ambiente acolhedor e uma variedade de produtos esperando por você.`,
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
                  <button className="btn-default">
                    <i style={{ fontSize: "16px" }}>agende agora</i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials">
          <img src="./images/testi.png" id="testimonials_chef" alt="Chef" />

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

            <button className="btn-default">Ver mais avaliações</button>
            <img src="./images/wave.svg" className="imga" alt="" />
          </div>
        </section>
      </main>

      <footer>
        <img src="./images/wave.svg" className="imga" alt="" />

        <div id="footer-items">
          <span id="copyright">
            © 2025 Pet da Carla — Todos os direitos reservados. <br />
            🐾 Banho e Tosa • Loja Online • Loja Física <br />
            📍 Rua dos Pets Felizes, 123 - São Paulo, SP <br />
            📞 (11) 94076-4312 <br />
            ✉️ contato@petdacarla.com.br <br />
            Siga a gente nas redes sociais: <br />
            <i className="fa-brands fa-facebook"></i> PET_CARLA_OFC/
            <br />
            <i className="fa-brands fa-instagram"></i> PET_CARLA_OFC
            <br />
            <i className="fa-brands fa-whatsapp"></i> (11)94076-4312
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
