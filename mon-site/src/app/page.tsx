"use client";

import { useEffect } from "react";
import Head from "next/head";

interface Project {
  title: string;
  imgSrc: string;
  description: string;
  link?: string;
  category: string;
}

export default function HomePage() {
  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    // Intersection Observer
    const sections = document.querySelectorAll(".hidden");

    if (window.innerWidth < 768) {
      sections.forEach((section) => section.classList.add("show"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      sections.forEach((section) => observer.observe(section));
    }

    // Snee card toggle
    const sneeCard = document.querySelector(".snee-card");
    if (sneeCard) {
      sneeCard.addEventListener("click", () =>
        sneeCard.classList.toggle("active")
      );
    }

    // Modal functionality
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalImage = document.getElementById("modalImage") as HTMLImageElement;
    const modalDescription = document.getElementById("modalDescription");
    const modalLink = document.getElementById("modalLink") as HTMLAnchorElement;
    const closeBtn = document.querySelector(".modal .close");

    const cards = document.querySelectorAll("#projects .card");
    cards.forEach((card) => {
      card.addEventListener("click", (e) => {
        if ((e.target as HTMLElement).closest("a")) return;

        if (!modal || !modalTitle || !modalImage || !modalDescription || !modalLink) return;

        modal.style.display = "flex";
        modalTitle.textContent =
          card.querySelector("h3")?.textContent ?? "";
        const img = card.querySelector("img");
        modalImage.src = img ? img.getAttribute("src") || "" : "";
        const hiddenContent = card.querySelector(".hidden-content");
        if (hiddenContent && hiddenContent.innerHTML.trim() !== "") {
          modalDescription.innerHTML = hiddenContent.innerHTML;
        } else {
          modalDescription.textContent =
            card.querySelector("p")?.textContent ?? "";
        }
        const link = card.querySelector("a");
        if (link) {
          modalLink.href = link.href;
          modalLink.style.display = "inline-block";
        } else {
          modalLink.style.display = "none";
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (modal) modal.style.display = "none";
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) modal!.style.display = "none";
    });

    // Filter buttons
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");
        const cards = document.querySelectorAll("#projects .card");

        cards.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            (card as HTMLElement).style.display = "block";
          } else {
            (card as HTMLElement).style.display = "none";
          }
        });
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>Julien Maille-Paez | Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/pictures/favicon.ico" type="image/x-icon" />
      </Head>

      <header>
        <div className="container">
          <div className="header-content">
            <h1>Julien Maille-Paez</h1>
            <p>Data Scientist</p>
            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/julien-maille-paez/"
                target="_blank"
                className="social-icon"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://github.com/julienMP06"
                target="_blank"
                className="social-icon"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="mailto:julien.maille.006@gmail.com"
                className="social-icon"
              >
                <i className="fas fa-envelope"></i>
              </a>
              <a
                href="/pictures/documents/CV_Julien_Maille-Paez.pdf"
                target="_blank"
                className="social-icon"
              >
                <i className="fas fa-file-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* === SECTIONS & PROJECTS === */}
      <main>
        {/* Exemple pour une section, tu peux copier-coller toutes tes sections et cards ici */}
        <section id="My Educational Background" className="hidden">
          <div className="container">
            <h2>My Educational Background</h2>
            <div className="timeline">
              {/* Timeline item 1 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>National Student Entrepreneur Status</h3>
                  <p>🏫 Pépite PEIPS</p>
                  <p>📅 2025</p>
                  <p>
                    Recognition of entrepreneurial skills and support for project development.
                  </p>
                </div>
              </div>

              {/* Timeline item 2 */}
              <div className="timeline-item">
                <div className="skills">
                  <span>Courses In English</span>
                </div>
                <div className="timeline-content">
                  <h3>Master's degree - Data Science</h3>
                  <p>🏫 Université Paris-Saclay</p>
                  <p>📌 Gif-sur-Yvette</p>
                  <p>📅 2023 - 2025</p>
                </div>
              </div>

              {/* Timeline item 3 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>Dual Bachelor's degree - Mathematics and Computer Science</h3>
                  <p>🏫 Université Paris-Saclay</p>
                  <p>📌 Gif-sur-Yvette</p>
                  <p>📅 2020 - 2023</p>
                </div>
              </div>

              {/* Timeline item 4 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>Baccalaureat in Sciences - Honours (European English Mention)</h3>
                  <p>🏫 Lycée Masséna</p>
                  <p>📌 Nice</p>
                  <p>📅 2017 - 2020</p>
                </div>
              </div>

              {/* Timeline item 5 (optionnel, commenté dans ton HTML original) */}
              {/*
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>Brevet des collèges - Highest Honours</h3>
                  <p>🏫 Collège Jean Cocteau</p>
                  <p>📌 Beaulieu sur mer</p>
                  <p>📅 2017</p>
                </div>
              </div>
              */}
            </div>
          </div>
        </section>

        <section id="My Professional Experience" className="hidden">
          <div className="container">
            <h2>My Professional Experience</h2>
            <div className="timeline">

              {/* Timeline item 1 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>French Riviera Airport Internship - Data Scientist Operational Data</h3>
                  <div className="company-info">
                    <img src="pictures/aeroport.webp" loading="lazy" alt="French Riviera Airport Logo" className="company-logo" />
                    <p>🏫 French Riviera Airport</p>
                    <p>📌 Nice, France</p>
                    <p>📅 March - August 2025</p>
                    <p><br/></p>
                    <p className="justified">
                      🔍 Participation in Data Science projects applied to airport operations. Integration, quality control and analysis of operational data in a Lakehouse environment on AWS. Contribution to the development of KPIs and creation of four strategic dashboards via AWS Quicksight, providing management teams with decision-making tools. Supported the design of operational forecasting models (ML), adapted their deployment in a business context (MLops) and produced operational analyses to aid decision-making.
                    </p>
                  </div>
                  <div className="skills">
                    <span>Python</span>
                    <span>ML</span>
                    <span>AWS Quicksight</span>
                    <span>AWS Athena</span>
                    <span>AWS SageMaker</span>
                    <span>AWS S3</span>
                    <span>SQL</span>
                    <span>JupyterLab</span>
                  </div>
                </div>
              </div>

              {/* Timeline item 2 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>Java BackEnd Developer</h3>
                  <div className="company-info">
                    <img src="pictures/thales.webp" loading="lazy" alt="Thales Logo" className="company-logo" />
                    <p>🏫 Thales</p>
                    <p>📌 Gémenos, France</p>
                    <p>📅 May - August 2024</p>
                    <p><br/></p>
                    <p className="justified">
                      🔍 Development and implementation of a source code obfuscation tool for software used to prepare data for personalising smart cards, enhancing code security and protection.
                    </p>
                  </div>
                  <div className="skills">
                    <span>Java</span>
                    <span>Maven</span>
                    <span>GitLab</span>
                    <span>CI/CD</span>
                    <span>Docker</span>
                  </div>
                </div>
              </div>

              {/* Timeline item 3 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>Mathematics Teacher</h3>
                  <div className="company-info">
                    <p>📌 Gif-sur-Yvette</p>
                    <p>📅 October 2023 - February 2025</p>
                  </div>
                </div>
              </div>

              {/* Timeline item 4 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>Data Scientist Intern Python and JavaScript Developer</h3>
                  <div className="company-info">
                    <img src="pictures/LISN.webp" loading="lazy" alt="LISN Logo" className="company-logo" />
                    <p>🏫 CNRS – Laboratoire Interdisciplinaire des Sciences du Numérique (LISN)</p>
                    <p>📌 Gif-sur-Yvette</p>
                    <p>📅 May - July 2023</p>
                    <p><br/></p>
                    <p className="justified">
                      🔍 Development of a JupyterLab extension allowing students to view their marks, averages, practical results and revisions via an interactive dashboard.
                    </p>
                  </div>
                  <div className="skills">
                    <span>Python</span>
                    <span>JavaScript</span>
                    <span>GitLab</span>
                    <span>JupyterLab</span>
                  </div>
                </div>
              </div>

              {/* Timeline item 5 */}
              <div className="timeline-item">
                <div className="timeline-content">
                  <h3>Python Dev</h3>
                  <div className="company-info">
                    <img src="pictures/socialink.webp" loading="lazy" alt="SocialInk Logo" className="company-logo" />
                    <p>🏫 SocialInk</p>
                    <p>📌 Freelance</p>
                    <p>📅 October 2021 - April 2022</p>
                  </div>
                  <div className="skills">
                    <span>Python</span>
                    <span>AWS</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="competitions" className="hidden">
          <div className="container">
            <h2>Competitions & Entrepreneurship</h2>
            <div className="competitions-container">

              {/* Competition 1 */}
              <div className="competition-card snee-card">
                <h3>National Student-Entrepreneur Status (SNEE)</h3>
                <img src="pictures/peips.webp" loading="lazy" alt="Peips Logo" className="competition-logo" />
                <p>📅 2025</p>
                <p>Program dedicated to student entrepreneurs</p>
                <div className="hidden-content">
                  <ul>
                    <li></li>
                  </ul>
                  <p>📅 Année : 2025</p>
                  <p>🔗 <a href="https://www.pepite-france.fr/" target="_blank" rel="noopener noreferrer">En savoir plus</a></p>
                </div>
              </div>                

              {/* Competition 2 */}
              <div className="competition-card">
                <h3>Physics Olympiad</h3>
                <img src="pictures/ODP.webp" loading="lazy" alt="ODP Logo" className="competition-logo" />
                <p>📅 2019</p>
                <p>Second place Physics Olympiad</p>
              </div>

            </div>
          </div>
        </section>

           
        <section id="projects" className="hidden">
          <div className="filter-buttons">
            <button className="filter-btn active" data-filter="all">All</button>
            <button className="filter-btn" data-filter="data-science">Data Science</button>
            <button className="filter-btn" data-filter="software">Software</button>
            <button className="filter-btn" data-filter="full-stack">Full Stack</button>
            <button className="filter-btn" data-filter="entrepreneurship">Entrepreneurship</button>
            <button className="filter-btn" data-filter="IOT">Internet Of Things</button>
            <button className="filter-btn" data-filter="video-games">Video Games</button>
          </div>

          <div className="container">
            <h2>My Projects</h2>
            <div className="cards-container">

              {/* Card 1 */}
              <div className="card" data-category="entrepreneurship">
                <img src="pictures/Projects/altairSite.webp" loading="lazy" alt="Altaïr Gym" />
                <h3>Altair Gym</h3>
                <p className="justified">
                  A fitness solution combining wearable technology and mobile applications 
                  to enhance workout experiences through motion tracking and personalized feedback.
                </p>
                <div className="hidden-content"></div>
                <div className="skills">
                  <span>In collaboration with Manitas Bahri</span>
                </div>
                <div className="social-icons2">
                  <a href="https://www.linkedin.com/company/altair-gym" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin linkedin-icon"></i>
                  </a>
                  <a href="https://www.instagram.com/altair.gym/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram instagram-icon"></i>
                  </a>
                  <a href="https://get-altair.com/fr" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-globe website-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="card" data-category="full-stack">
                <img src="pictures/Projects/altairSite.webp" loading="lazy" alt="Altaïr Gym Website" />
                <h3>Altair Gym | Website</h3>
                <p className="justified">
                  This project consists of a responsive marketing website for Altair Gym, deployed on Vercel. 
                  The website presents the product, its features, and allows visitors to subscribe to newsletters managed via Supabase.
                </p>
                <div className="hidden-content">
                  <p>
                    The development used a monorepo architecture with pnpm, ensuring efficient dependency management and scalability.
                    Key features:
                    Responsive design for desktop, tablet, and mobile. 
                    Newsletter subscription integrated with Supabase. 
                    CI/CD pipeline for deployment on Vercel. 
                    Built with Next.js for optimal performance and SEO.
                  </p>
                </div>
                <div className="skills">
                  <span>Next.js</span>
                  <span>pnpm</span>
                  <span>Supabase</span>
                  <span>Vercel</span>
                  <span>CI/CD</span>
                </div>
                <div className="social-icons2">
                  <a href="https://get-altair.com/fr" target="_blank" rel="noopener noreferrer">
                    <i className="fas fa-globe website-icon"></i>
                  </a>
                </div>
              </div>
              {/* Card 3 */}
              <div className="card" data-category="full-stack">
                <img src="pictures/Projects/SeaScape.webp" loading="lazy" alt="Boat Booking Platform" />
                <h3>Boat Booking Platform</h3>
                <p className="justified">
                  Web platform for booking and renting boats between individuals and professionals, with search, booking management and a modern, responsive interface.
                </p>
                <div className="hidden-content">
                  <p>
                    SeaScape is a comprehensive web application that allows individuals and professionals to book, rent and list boats. The project aims to offer a smooth, secure and intuitive experience for exploring, comparing, and booking boats. 🔧 Main features include dynamic catalogue of boats with filters, online booking system, user area for managing bookings, and optional admin page.
                  </p>
                </div>
                <div className="skills">
                  <span>Next.js</span>
                  <span>Supabase</span>
                  <span>PostgreSQL</span>
                </div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/SeaScape" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 4 */}
              <div className="card" data-category="data-science">
                <img src="pictures/Projects/NBA.webp" loading="lazy" alt="NBA Players Position Prediction 2" />
                <h3>NBA Players Position Prediction 2 (largest dataset)</h3>
                <p className="justified">
                  This project explores NBA data using data science techniques to uncover insights about player performance, team statistics, and trends over time. Analysis was conducted using Python with Pandas, Matplotlib, and Seaborn.
                </p>
                <div className="hidden-content">
                  <p>
                    🔍 What I Did: Data Collection & Preprocessing, Exploratory Data Analysis, Feature Engineering, Statistical & Visual Analysis, Insights & Findings about player and team performance.
                  </p>
                </div>
                <div className="skills">
                  <span>Python</span>
                  <span>Scikit-Learn</span>
                  <span>Numpy</span>
                  <span>Pandas</span>
                  <span>Matplotlib</span>
                  <span>Seaborn</span>
                </div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/NBA_Data-Analysis-" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 5 */}
              <div className="card" data-category="data-science">
                <img src="pictures/Projects/NBA1.webp" loading="lazy" alt="NBA Players Position Prediction 1" />
                <h3>NBA Players Position Prediction 1</h3>
                <p className="justified">
                  This project explores NBA data using data science techniques to uncover insights about player performance, team statistics, and trends over time. Analysis was conducted using Python with Pandas, Matplotlib, and Seaborn.
                </p>
                <div className="hidden-content">
                  <p>
                    🔍 What I Did: Data Collection & Preprocessing, Exploratory Data Analysis, Feature Engineering, Statistical & Visual Analysis, Insights & Findings about player and team performance.
                  </p>
                </div>
                <div className="skills">
                  <span>Python</span>
                  <span>Scikit-Learn</span>
                  <span>Numpy</span>
                  <span>Pandas</span>
                  <span>Matplotlib</span>
                  <span>Seaborn</span>
                </div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/NBA-Prediction-1" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>
              {/* Card 6 */}
              <div className="card" data-category="data-science">
                <img src="pictures/Projects/WOD.webp" loading="lazy" alt="Geospatial analysis of ski resorts" />
                <h3>Geospatial analysis of ski resorts</h3>
                <p className="justified">
                  Design of a Knowledge Graph linking ski resorts to airports located within a 100 km radius. Extraction, cleaning and geocoding of data, then querying the graph via SPARQL to visualize correspondences.
                </p>
                <div className="hidden-content">
                  <p>🔍 Details of implementation are documented in the project repository.</p>
                </div>
                <div className="skills">
                  <span>SQL</span>
                  <span>GeoPandas</span>
                  <span>RDFLib</span>
                  <span>SPARQL</span>
                  <span>Wikidata</span>
                </div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/WOD" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 7 */}
              <div className="card" data-category="data-science">
                <img src="pictures/Projects/volcan.webp" loading="lazy" alt="Datacamp VolcanicPrediction" />
                <h3>Datacamp Telecom SudParis VolcanicPrediction (Rank 17/180)</h3>
                <p className="justified">
                  This project, developed as part of a DataCamp course, focuses on predicting volcanic eruptions using machine learning techniques. Analysis of seismic and geophysical data to identify patterns.
                </p>
                <div className="hidden-content">
                  <p>
                    🔍 What I Did: Data Exploration & Preprocessing, Machine Learning Modeling, Hyperparameter Tuning, Model Evaluation & Interpretation.
                  </p>
                </div>
                <div className="skills">
                  <span>Python</span>
                  <span>Pandas</span>
                  <span>Numpy</span>
                  <span>Scikit-Learn</span>
                </div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/Datacamp-VolcanicPrediction" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 8 */}
              <div className="card" data-category="data-science">
                <img src="pictures/Projects/TER.webp" loading="lazy" alt="Stochastic Simulation" />
                <h3>Stochastic Simulation</h3>
                <p className="justified">
                  Project carried out as part of the first-year TER of the Master's in Data Science at Paris-Saclay University. Stochastic simulation of chemical reactions involving enzymes and substrates.
                </p>
                <div className="hidden-content">
                  <p>
                    Simulation reproduces the movements of molecules inside cell vesicles with complex, random, and realistic interactions with enzymes.
                  </p>
                </div>
                <div className="skills">
                  <span>C++</span>
                  <span>OpenGL</span>
                </div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/TER_Enzyme" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>
              {/* Card 9 */}
              <div className="card" data-category="IOT">
                <img src="pictures/Projects/rasptank.webp" loading="lazy" alt="RapsTank Battle" />
                <h3>RapsTank Battle</h3>
                <p className="justified">
                  Network programming using MQTT protocol. Implementation of publisher-subscriber architecture for IoT devices enabling real-time data exchange.
                </p>
                <div className="hidden-content">
                  <p>
                    🔍 What I Did: MQTT Protocol Implementation, Multi-Client Communication & Data Transmission, Testing & Optimization.
                  </p>
                </div>
                <div className="skills">
                  <span>Python</span>
                  <span>Raspberry Pi OS</span>
                  <span>SSH</span>
                  <span>MQTT</span>
                  <span>Tkinter</span>
                </div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/ProgReseau" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 10 */}
              <div className="card" data-category="full-stack">
                <img src="pictures/Projects/Dashboard1.webp" loading="lazy" alt="Dashboard for student grades" />
                <h3>Dashboard for student grades</h3>
                <p className="justified">
                  JupyterLab extension allowing students to view marks, averages, practical results and revisions via an interactive dashboard.
                </p>
                <div className="hidden-content">
                  <p></p>
                </div>
                <div className="skills">
                  <span>Python</span>
                  <span>JavaScript</span>
                  <span>GitLab</span>
                  <span>JupyterLab</span>
                </div>
              </div>

              {/* Card 11 */}
              <div className="card" data-category="data-science">
                <img src="pictures/Projects/bioinfo.webp" loading="lazy" alt="Computational Biology" />
                <h3>Computational Biology</h3>
                <p></p>
                <div className="hidden-content">
                  <p></p>
                </div>
                <div className="skills">
                  <span>Python</span>
                  <span>Numpy</span>
                  <span>Pandas</span>
                  <span>MatplotLib</span>
                  <span>Scikit-Learn</span>
                  <span>CSV</span>
                  <span>PCA</span>
                </div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/BioInfo2" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>
              {/* Card 12 */}
              <div className="card" data-category="video-games">
                <img src="pictures/Projects/ileinterdite.webp" loading="lazy" alt="Forbidden island game" />
                <h3>Forbidden Island Game</h3>
                <p></p>
                <div className="hidden-content"><p></p></div>
                <div className="skills">
                  <span>Java</span>
                  <span>Model-View-Controller</span>
                  <span>Oriented Object Programming</span>
                </div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/Projet_ile_interdite" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 13 */}
              <div className="card" data-category="video-games">
                <img src="pictures/Projects/fur.webp" loading="lazy" alt="Vector generation of fur" />
                <h3>Vector Generation of Fur</h3>
                <p></p>
                <div className="hidden-content"><p></p></div>
                <div className="skills"><span>Processing</span></div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/ProjetPoils-Inforgraphie" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 14 */}
              <div className="card" data-category="software">
                <img src="pictures/Projects/ocaml.webp" loading="lazy" alt="Mini ML Interpreter" />
                <h3>Mini ML Interpreter</h3>
                <p></p>
                <div className="hidden-content">
                  <p>
                    Mini ML is a programming language inspired by ML. Includes lexer, parser, type checker, and interpreter.
                  </p>
                </div>
                <div className="skills"><span>OCaml</span></div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/Compilation" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 15 */}
              <div className="card" data-category="software">
                <img src="pictures/Projects/simants.webp" loading="lazy" alt="Ants Simulation" />
                <h3>Ants Simulation</h3>
                <p></p>
                <div className="hidden-content"><p></p></div>
                <div className="skills"><span>C++</span></div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/Projet-ProgMod-Fourmis" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 16 */}
              <div className="card" data-category="video-games">
                <img src="pictures/Projects/UlamSpiral.webp" loading="lazy" alt="3D Ulam Spiral" />
                <h3>3D Ulam Spiral</h3>
                <p></p>
                <div className="hidden-content"><p></p></div>
                <div className="skills"><span>Processing</span></div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/InfoGraph" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 17 */}
              <div className="card" data-category="software">
                <img src="pictures/Projects/Graph.webp" loading="lazy" alt="Directed Graph Operations" />
                <h3>Directed Graph Operations</h3>
                <p></p>
                <div className="hidden-content"><p></p></div>
                <div className="skills"><span>Python</span></div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/Projet-Info-GraphOrient-" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 18 */}
              <div className="card" data-category="software">
                <img src="pictures/Projects/dessin.webp" loading="lazy" alt="Drawing App" />
                <h3>Drawing App</h3>
                <p></p>
                <div className="hidden-content"><p></p></div>
                <div className="skills">
                  <span>Java</span>
                  <span>CSS</span>
                </div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/Application-Dessin" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 19 */}
              <div className="card" data-category="software">
                <img src="pictures/Projects/discord.webp" loading="lazy" alt="Discord Bot" />
                <h3>Discord Bot</h3>
                <p></p>
                <div className="hidden-content"><p></p></div>
                <div className="skills"><span>Python</span></div>
              </div>

              {/* Card 20 */}
              <div className="card" data-category="video-games">
                <img src="pictures/Projects/puyo.webp" loading="lazy" alt="Puyo Puyo" />
                <h3>Puyo Puyo</h3>
                <p></p>
                <div className="hidden-content"><p></p></div>
                <div className="skills"><span>C++</span></div>
                <div className="social-icons2">
                  <a href="https://github.com/julienMP06/Projet-PUYO" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github github-icon"></i>
                  </a>
                </div>
              </div>

              {/* Card 21 */}
              <div className="card" data-category="video-games">
                <img src="pictures/Projects/Human.webp" loading="lazy" alt="Human body management simulation game" />
                <h3>Human Body Management Simulation Game</h3>
                <p></p>
                <div className="hidden-content"><p></p></div>
                <div className="skills"><span>Processing</span></div>
              </div>

              {/* Card 22 */}
              <div className="card" data-category="video-games">
                <img src="pictures/Projects/CITY.webp" loading="lazy" alt="City management simulation game" />
                <h3>City Management Simulation Game</h3>
                <p></p>
                <div className="hidden-content"><p></p></div>
                <div className="skills"><span>Processing</span></div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <footer>
        <div className="container">
          <p>&copy; 2025 Julien Maille-Paez. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal */}
      <div id="projectModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <h3 id="modalTitle"></h3>
          <img id="modalImage" alt="Project Image" />
          <p id="modalDescription"></p>
          <a id="modalLink" href="#" target="_blank">
            <i className="fab fa-github github-icon"></i>
          </a>
        </div>
      </div>
    </>
  );
}
