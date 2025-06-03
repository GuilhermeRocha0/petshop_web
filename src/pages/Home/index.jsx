import React, { useState, useEffect } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import BotaoTema from '../../components/BotaoTema'

const Home = () => {
  const [menuActive, setMenuActive] = useState(false)

  const handleMobileMenu = () => {
    setMenuActive(!menuActive)
  }

  return (
    <div>
      <header className="ho-header">
        <nav id="navbar">
          <i className="fa-solid fa-paw" id="nav_logo">
            <span> </span>Pet <span>da</span> Carla
          </i>

          <ul id="nav_list">
            <li className="nav-item" alt='Ecomerce'>
              <Link to="/loja">Ecommerce</Link>
            </li>
            <li className="nav-item" alt='Seus agendamentos'>
              <Link to="/agendamentos">Agendamentos</Link>
            </li>
            <li className="nav-item active" alt='Sobre Nós'>
              <Link>Sobre nós</Link>
            </li>
          </ul>


          <Link to="/login" className="btn-default">
            Entrar
          </Link>


          <button id="mobile_btn" onClick={handleMobileMenu}>
            <i className={menuActive ? 'fa fa-x' : 'fa fa-bars'}></i>
          </button>
        </nav>

        <div id="mobile_menu" className={menuActive ? 'active' : ''}>
          <ul id="mobile_nav_list">
            <li className="nav-item">
              <Link to="/loja">Ecomerce</Link>
            </li>
            <li className="nav-item">
              <Link to="/agendamentos">Agendamentos</Link>
            </li>
            <li className="nav-item">
              <Link>Sobre nós</Link>
            </li>
          </ul>


          <Link to="/login" className="btn-default">
            Entrar
          </Link>

        </div>
      </header>

      <main id="content">
        <section id="home">
          <div className="shape"></div>
          <div id="cta">
            <h1 className="ho-title">
              🐾O cuidado que seu pet merece, com carinho de
              <span> Verdade!</span>
              <BotaoTema />
            </h1>

            <p className="description">
              Entregamos alegria, conforto e produtos de qualidade direto pra
              você e seu melhor amigo. <br /> Aqui no Pet da Carla, cada latido
              importa! ❤️🐶
            </p>

            <div id="cta_buttons" style={{ display: 'flex', gap: '20px' }}>
              <Link to="/agendamentos">
                <a href="#" className="btn-default" alt='Agende seu serviço'>
                  Agendar já
                </a>
              </Link>

              <a href="tel:(11)2747-2107" id="phone_button">
                <button className="btn-default" alt='Ligar'>
                  <i
                    className="fa-solid fa-phone"
                    style={{ fontSize: '16px' }}
                  ></i>
                </button>
                (11) 2747-2107
              </a>
            </div>

            <div className="social-media-buttons">
              <a href="https://api.whatsapp.com/send?phone=5511946474250&text&context=AfdDXsugVIq8cDkTkEi1IOiTaYuB2wtzUD675fm8MJRXp-3KUXAq0sZQxJCMgKgWd_nkyX8fNlhVgjq3SstCZvYXdmAkjZ7-C9hJHhCbH-GW7kKqRu9eaBageKnsf5UCf0r-Ga5xHeelThC_4Q&source&app=facebook">
                <i className="fa-brands fa-whatsapp" id="zap" title='WhatsApp'></i>
              </a>
              <a href="https://www.instagram.com/explore/locations/913624535/pet-da-carla/">
                <i className="fa-brands fa-instagram" id="insta" title='Instragram'></i>
              </a>
              <a href="https://pt-br.facebook.com/petdacarla">
                <i className="fa-brands fa-facebook" id="face" title='Facebook'></i>
              </a>
            </div>
          </div>

          <div id="banner">
            <img src="./images/alpha.png" alt="Banner cachorro sentado"  />
          </div>
        </section>

        <section id="menu">
          <h2 className="section-title">Serviços</h2>
          <h3 className="section-subtitle">disponíveis</h3>

          <div id="dishes">
            {/* Repetir este bloco para cada serviço */}
            {[
              {
                img: './images/banhoo.png',
                title: '🛁 Banho',
                description: `Seu pet limpinho, cheiroso e feliz! 💦\ntomamos todo o cuidado e delicadeza que seu bichinho merece.`
              },
              {
                img: './images/tosauu.png',
                title: '✂️ Tosa',
                description: `Estilo saúde e conforto para seu pet! ✨\nTosas higiênicas, na tesoura ou máquina, com carinho e profissionais. `
              },
              {
                img: './images/ecomercee.png',
                title: '🛒 Loja Online',
                description: `Tudo para seu pet com carinho! 🐾 \nRações, brinquedos, acessórios e mais, com entrega rápida e segura.`
              },
              {
                img: './images/lojaa.png',
                title: '🏪 Loja Física',
                description: `Estamos esperando por você 🐶🎈\nAmbiente acolhedor e uma variedade de produtos esperando por você.`
              }
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
                  <span>(100+)</span>
                </div>

                <div className="sih-price">
                  <Link to="/agendamentos">
                    <button className="btn-default" alt="Agende agora um serviço">
                      <i style={{ fontSize: '16px' }}>Agende agora</i>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials">

          <div
            className="imagem-fundo"
            id="testimonials_chef"
            alt="Cachorro herói"
          ></div>


          <div id="testimonials_content">
            <h2 className="section-title">Depoimentos</h2>
            <h3 className="section-subtitle">
              O que os clientes falam sobre nós
            </h3>

            <div id="feedbacks">
              {[
                {
                  name: 'Bruno Costa',
                  img: './images/rosto1.png',
                  text: `“Equipe muito atenciosa, ambiente limpo e meu cachorrinho ficou super tranquilo durante a tosa. Com certeza virei cliente fiel!”`
                },
                {
                  name: 'Lucas Fernandes',
                  img: './images/rosto2.png',
                  text: `“Levo meu cachorro no Pet da Carla há meses e o atendimento é sempre incrível! Ele adora o banho e volta super cheiroso. Recomendo demais!”`
                }
              ].map((item, index) => (
                <div id="feedback" key={index}>
                  <img
                    src={item.img}
                    className="feedback-avatar"
                    alt={item.name}
                  />
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
              <a className="btn-default-fi" target='_blank' href="https://www.google.com/search?sca_esv=edb63bcffe9bdd76&si=APYL9bvoDGWmsM6h2lfKzIb8LfQg_oNQyUOQgna9TyfQHAoqUuedQ8T0HxmqEjKZHICZ01NiCiL-k3cU8hwvJjz04TujuquPjxamnPSSFJ2zMWUIVKS6p7KryuuwWfXqdvVzseBcm08gyFpC88qG1IVPgEYkoYSYmQ%3D%3D&q=PET+DA+CARLA+Coment%C3%A1rios&sa=X&ved=2ahUKEwjQ5pPribeNAxVmJrkGHbk9L8UQ0bkNegQIMhAE&biw=1920&bih=919&dpr=1">Ver mais avaliações</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <p>© 2025 Pet da Carla — Todos os direitos reservados.</p>

          <p>
            <i className="fa-solid fa-bone"></i> Banho e Tosa • Loja Online •
            Loja Física
          </p>

          <p>
            <i className="fa-solid fa-location-dot"></i>  Av. Líder, 2828 - Cidade Líder, São Paulo
          </p>

          <p>
            <i className="fa-solid fa-phone"></i> (11) 2747-2107
          </p>

          <p>
            <i className="fa-solid fa-envelope"></i>{' '}
            <a href="mailto:contato@petdacarla.com.br">
              contato@petdacarla.com.br
            </a>
          </p>

          <p>Siga a gente nas redes sociais:</p>

          <div className="social-footer">
            <a href="https://pt-br.facebook.com/petdacarla">
              <i className="fa-brands fa-facebook"></i> PET Da Carla
            </a>
            <a href="https://www.instagram.com/explore/locations/913624535/pet-da-carla/">
              <i className="fa-brands fa-instagram"></i> PET Da Carla
            </a>
            <a href="https://api.whatsapp.com/send?phone=5511946474250&text&context=AfdDXsugVIq8cDkTkEi1IOiTaYuB2wtzUD675fm8MJRXp-3KUXAq0sZQxJCMgKgWd_nkyX8fNlhVgjq3SstCZvYXdmAkjZ7-C9hJHhCbH-GW7kKqRu9eaBageKnsf5UCf0r-Ga5xHeelThC_4Q&source&app=facebook">
              <i className="fa-brands fa-whatsapp"></i> +55 (11) 94647-4250
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
