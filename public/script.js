document.addEventListener('DOMContentLoaded', () => {

    // --- ALTERNAÇÃO DE TEMA CLARO / ESCURO ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const skillsChartCanvas = document.getElementById('skillsChart');
    let skillsChart;


    function getChartColors() {
        const isLightMode = body.classList.contains('light-mode');
        // Cores para o tema claro
        if (isLightMode) {
            return {
                angleLines: 'rgba(0, 0, 0, 0.1)',
                grid: 'rgba(0, 0, 0, 0.1)',
                pointLabels: '#3D3D3D',
                ticks: '#9E9E9E'
            };
        }
        // Cores para o tema escuro
        return {
            angleLines: 'rgba(255, 255, 255, 0.2)',
            grid: 'rgba(255, 255, 255, 0.2)',
            pointLabels: '#E0E0E0',
            ticks: '#A0A0A0'
        };
    }


    function updateChartTheme() {
        if (!skillsChart) return;
        const newColors = getChartColors();
        skillsChart.options.scales.r.angleLines.color = newColors.angleLines;
        skillsChart.options.scales.r.grid.color = newColors.grid;
        skillsChart.options.scales.r.pointLabels.color = newColors.pointLabels;
        skillsChart.options.scales.r.ticks.color = newColors.ticks;
        skillsChart.update();
    }

    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const applyTheme = (theme) => {
            if (theme === 'light') {
                body.classList.add('light-mode');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                body.classList.remove('light-mode');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }

            updateChartTheme();
        };

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        } else if (systemPrefersDark) {
            applyTheme('dark');
        } else {
            applyTheme('light');
        }

        themeToggle.addEventListener('click', () => {
            const newTheme = body.classList.toggle('light-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contactForm');
    const statusMessage = document.getElementById('statusMessage');

    if (contactForm && statusMessage) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            statusMessage.style.display = 'none';
            statusMessage.className = '';
            statusMessage.textContent = '';

            const formData = {
                name: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('assunto').value,
                message: document.getElementById('mensagem').value
            };

            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (response.ok) {
                    statusMessage.textContent = data.message;
                    statusMessage.classList.add('success');
                    contactForm.reset();
                } else {
                    statusMessage.textContent = data.message || 'Erro desconhecido ao enviar a mensagem.';
                    statusMessage.classList.add('error');
                }
            } catch (error) {
                console.error('Erro na requisição Fetch:', error);
                statusMessage.textContent = 'Ocorreu um erro na comunicação. Tente novamente.';
                statusMessage.classList.add('error');
            } finally {
                statusMessage.style.display = 'block';
            }
        });
    }

    // --- HEADER SCROLL E MENU HAMBÚRGUER ---
    const header = document.querySelector('header');
    const menuHamburger = document.querySelector('.menu-hamburger');
    const menuList = document.querySelector('.menu_list');

    if (header) {
        window.addEventListener('scroll', () => {

            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    if (menuHamburger && menuList) {
        menuHamburger.addEventListener('click', () => {
            menuHamburger.classList.toggle('active');
            menuList.classList.toggle('active');
            body.classList.toggle('body-no-scroll');
        });
    }

    // --- PAINEL DE COMPETÊNCIAS INTERATIVO ---
    if (skillsChartCanvas) {
        const initialColors = getChartColors();
        const ctx = skillsChartCanvas.getContext('2d');


        skillsChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Front-end', 'Back-end', 'Cloud & DevOps', 'Soft Skills', 'Bancos de Dados'],
                datasets: [{
                    label: 'Nível de Proficiência',
                    data: [9, 8, 7, 9, 8],
                    backgroundColor: 'rgba(103, 58, 183, 0.2)',
                    borderColor: 'rgba(103, 58, 183, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(103, 58, 183, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(103, 58, 183, 1)'
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: initialColors.angleLines },
                        grid: { color: initialColors.grid },
                        pointLabels: { font: { size: 12 }, color: initialColors.pointLabels },
                        ticks: {
                            backdropColor: 'transparent',
                            color: initialColors.ticks,
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        const skills = {
            frontend: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
            backend: ['Node.js', 'NestJS', 'TypeORM', 'Java', 'Python', 'Jest', 'APIs REST', 'Testes Unitários'],
            devops: ['Docker', 'AWS', 'Google Cloud', 'Oracle Cloud (OCI)', 'Git', 'GitHub'],
            softskills: ['Comunicação Assertiva', 'Resolução de Problemas', 'Trabalho em Equipe', 'Empatia com o Usuário', 'Resiliência', 'Análise Crítica'],
            other: ['Figma', 'UX/UI', 'Engenharia de Prompt', 'PostgreSQL', 'MySQL', 'N8n']
        };

        const skillTabs = document.querySelectorAll('.skill-tab');
        const skillsContent = document.getElementById('skills-content');

        function updateSkillsContent(category) {
            const items = skills[category];
            skillsContent.innerHTML = `
                <div class="flex-container">
                    ${items.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            `;
        }

        skillTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                skillTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const category = tab.getAttribute('data-category');
                updateSkillsContent(category);
            });
        });

        updateSkillsContent('frontend');
    }
});