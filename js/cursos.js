// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const courseCards = document.querySelectorAll('.course-card');

// 
// DADOS DOS CURSOS
// Para adicionar um novo curso, adicione um novo objeto neste array
// com a mesma estrutura dos existentes
//
const coursesData = {
    'fileserver-linux': {
        title: 'File Server Linux',
        description: 'Um curso completo sobre implementação e gerenciamento de servidores de arquivos em Linux. Aprenda a configurar Samba, NFS, FTP e implementar soluções de backup e sincronização. Ideal para administradores de sistema que desejam dominar o compartilhamento de arquivos em redes corporativas.',
        duration: '6 horas',
        lessons: '18 aulas',
        level: 'Intermediário',
        curriculum: [
            { number: 1, title: 'Introdução aos Servidores de Arquivo', duration: '15 min' },
            { number: 2, title: 'Configuração do Sistema Base', duration: '20 min' },
            { number: 3, title: 'Instalação do Samba Server', duration: '25 min' },
            { number: 4, title: 'Configuração de Compartilhamentos', duration: '30 min' },
            { number: 5, title: 'Gerenciamento de Usuários e Grupos', duration: '25 min' },
            { number: 6, title: 'Permissões e Segurança', duration: '35 min' },
            { number: 7, title: 'Configuração do NFS', duration: '20 min' },
            { number: 8, title: 'Montagem Automática', duration: '15 min' },
            { number: 9, title: 'Servidor FTP com vsftpd', duration: '25 min' },
            { number: 10, title: 'SSL/TLS no FTP', duration: '20 min' },
            { number: 11, title: 'Quotas de Disco', duration: '18 min' },
            { number: 12, title: 'Monitoramento de Recursos', duration: '22 min' },
            { number: 13, title: 'Backup Automatizado', duration: '30 min' },
            { number: 14, title: 'Sincronização com rsync', duration: '25 min' },
            { number: 15, title: 'Logs e Troubleshooting', duration: '20 min' },
            { number: 16, title: 'Performance e Otimização', duration: '25 min' },
            { number: 17, title: 'Alta Disponibilidade', duration: '30 min' },
            { number: 18, title: 'Projeto Final', duration: '35 min' }
        ],
        accessLink: 'curso001.html'
    },
    'proxmox': {
        title: 'Proxmox VE',
        description: 'Domine a plataforma de virtualização enterprise Proxmox Virtual Environment. Desde a instalação básica até clusters de alta disponibilidade, backup, migração e monitoramento. Aprenda a gerenciar ambientes virtualizados profissionais com containers LXC e máquinas virtuais KVM.',
        duration: '8 horas',
        lessons: '24 aulas',
        level: 'Avançado',
        curriculum: [
            { number: 1, title: 'Introdução ao Proxmox VE', duration: '20 min' },
            { number: 2, title: 'Instalação e Configuração Inicial', duration: '25 min' },
            { number: 3, title: 'Interface Web e Primeiros Passos', duration: '20 min' },
            { number: 4, title: 'Configuração de Storage', duration: '30 min' },
            { number: 5, title: 'Criando VMs Linux', duration: '25 min' },
            { number: 6, title: 'Criando VMs Windows', duration: '25 min' },
            { number: 7, title: 'Containers LXC', duration: '30 min' },
            { number: 8, title: 'Templates e ISOs', duration: '20 min' },
            { number: 9, title: 'Redes e VLANs', duration: '35 min' },
            { number: 10, title: 'Firewall Integrado', duration: '25 min' },
            { number: 11, title: 'Snapshots e Restore', duration: '20 min' },
            { number: 12, title: 'Sistema de Backup', duration: '30 min' },
            { number: 13, title: 'Migração de VMs', duration: '25 min' },
            { number: 14, title: 'Configuração de Cluster', duration: '40 min' },
            { number: 15, title: 'Alta Disponibilidade (HA)', duration: '35 min' },
            { number: 16, title: 'Balanceamento de Carga', duration: '30 min' },
            { number: 17, title: 'Monitoramento e Logs', duration: '25 min' },
            { number: 18, title: 'Performance Tuning', duration: '30 min' },
            { number: 19, title: 'Atualizações e Manutenção', duration: '20 min' },
            { number: 20, title: 'Troubleshooting Avançado', duration: '25 min' },
            { number: 21, title: 'Integração com APIs', duration: '30 min' },
            { number: 22, title: 'Automação com Scripts', duration: '25 min' },
            { number: 23, title: 'Boas Práticas de Segurança', duration: '30 min' },
            { number: 24, title: 'Projeto Final - Datacenter Virtual', duration: '45 min' }
        ],
        accessLink: 'curso002.html'
    },
    'glpi': {
        title: 'GLPI - Gestão de TI',
        description: 'Sistema completo de Service Desk e gestão de ativos de TI com GLPI. Aprenda a implementar, customizar e gerenciar tickets, inventário, contratos e relatórios. Solução open source para ITIL e gestão completa de infraestrutura de TI empresarial.',
        duration: '5 horas',
        lessons: '15 aulas',
        level: 'Intermediário',
        curriculum: [
            { number: 1, title: 'Introdução ao GLPI', duration: '20 min' },
            { number: 2, title: 'Instalação e Configuração', duration: '25 min' },
            { number: 3, title: 'Interface e Navegação', duration: '15 min' },
            { number: 4, title: 'Configuração Inicial do Sistema', duration: '30 min' },
            { number: 5, title: 'Gestão de Usuários e Grupos', duration: '25 min' },
            { number: 6, title: 'Inventário de Ativos', duration: '30 min' },
            { number: 7, title: 'Sistema de Tickets', duration: '35 min' },
            { number: 8, title: 'Workflows e Aprovações', duration: '25 min' },
            { number: 9, title: 'Base de Conhecimento', duration: '20 min' },
            { number: 10, title: 'Contratos e Fornecedores', duration: '25 min' },
            { number: 11, title: 'Orçamentos e Custos', duration: '20 min' },
            { number: 12, title: 'Relatórios e Dashboard', duration: '30 min' },
            { number: 13, title: 'Plugins e Customização', duration: '25 min' },
            { number: 14, title: 'Backup e Manutenção', duration: '20 min' },
            { number: 15, title: 'Projeto Prático - Help Desk Completo', duration: '35 min' }
        ],
        accessLink: 'curso003.html'
    }
};

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove header background based on scroll position
    if (scrollTop > 100) {
        header.style.background = 'rgba(23, 23, 26, 0.98)';
        header.style.borderBottom = '1px solid rgba(118, 65, 230, 0.2)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(23, 23, 26, 0.95)';
        header.style.borderBottom = '1px solid rgba(118, 65, 230, 0.1)';
        header.style.boxShadow = 'none';
    }
    
    // Keep header always visible (fixed)
    header.style.transform = 'translateY(0)';
});

// Course Cards Click Events
courseCards.forEach(card => {
    const viewButton = card.querySelector('.view-course');
    
    viewButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const courseUrl = card.getAttribute('data-course-url');
        
        // Redireciona diretamente para a página do curso
        window.location.href = courseUrl;
    });
    
    // Clique no card também redireciona diretamente
    card.addEventListener('click', (e) => {
        // Se clicar no botão, não duplica o redirecionamento
        if (e.target.closest('.view-course')) {
            return;
        }
        
        const courseUrl = card.getAttribute('data-course-url');
        window.location.href = courseUrl;
    });
});

// Scroll animations
const observeElements = document.querySelectorAll('.course-card');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

observeElements.forEach((el, index) => {
    el.classList.add('scroll-fade');
    el.style.animationDelay = `${index * 0.1}s`;
    fadeInObserver.observe(el);
});

// Button click animations
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            background: rgba(255, 255, 255, 0.3);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const rippleCSS = document.createElement('style');
rippleCSS.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleCSS);

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth reveal animation on page load
window.addEventListener('load', () => {
    document.body.classList.add('loading');
    
    // Animate stats with counter
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', '').replace('%', ''));
        const isPercentage = stat.textContent.includes('%');
        const hasPlus = stat.textContent.includes('+');
        let current = 0;
        
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (hasPlus) displayValue += '+';
            if (isPercentage) displayValue += '%';
            
            stat.textContent = displayValue;
        }, 30);
    });
});

// Add hover effects to course cards
courseCards.forEach(card => {
    const icon = card.querySelector('.course-icon');
    
    card.addEventListener('mouseenter', () => {
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'all 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

console.log('Página de cursos OpenKit carregada com sucesso! 📚');