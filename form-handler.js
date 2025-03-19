document.addEventListener('DOMContentLoaded', function() {
    // Initialize Supabase client
    const supabaseUrl = 'https://fpvreeivdbwhluculvsr.supabase.co'; // Replace with your Supabase URL
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwdnJlZWl2ZGJ3aGx1Y3VsdnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NjUyMTksImV4cCI6MjA0ODA0MTIxOX0.GwlsV6wNqwZk4VgBfVtYiWEBD15k-euHFyQnzhzdZP0'; // Replace with your Supabase anon key
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);
    
    // Handle form submission
    const leadForm = document.getElementById('leadForm');
    const submitSpinner = document.getElementById('submitSpinner');
    const submitText = document.getElementById('submitText');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    if (leadForm) {
        leadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            submitSpinner.style.display = 'inline-block';
            submitText.textContent = 'SUBMITTING...';
            
            // Hide previous messages
            formSuccess.style.display = 'none';
            formError.style.display = 'none';
            
            try {
                // Get form data
                const formData = {
                    name: document.getElementById('name').value,
                    company: document.getElementById('company').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    budget: document.getElementById('budget').value,
                    message: document.getElementById('message').value,
                    created_at: new Date().toISOString(),
                    status: 'new'
                };
                
                // Insert into Supabase
                const { data, error } = await supabase
                    .from('leads')
                    .insert([formData]);
                
                if (error) throw error;
                
                // Show success message
                formSuccess.style.display = 'block';
                leadForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                formError.style.display = 'block';
            } finally {
                // Reset button state
                submitSpinner.style.display = 'none';
                submitText.textContent = 'CLAIM YOUR FREE STRATEGY SESSION NOW';
            }
        });
    }
    
    // FAQ Toggles
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        // Initially hide answers
        if (answer) {
            answer.style.display = 'none';
        }
        
        if (question && answer && toggle) {
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                // Close all FAQs
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    
                    if (otherAnswer && otherToggle) {
                        otherAnswer.style.display = 'none';
                        otherToggle.textContent = '+';
                        otherToggle.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current FAQ
                if (!isOpen) {
                    answer.style.display = 'block';
                    toggle.textContent = '−';
                    toggle.style.transform = 'rotate(180deg)';
                }
            });
        }
    });
    
    // Scroll animations
    const scrollElements = document.querySelectorAll('.benefit-card, .expertise-card, .section-header');
    
    scrollElements.forEach(element => {
        element.classList.add('scroll-animation');
    });
    
    function handleScrollAnimation() {
        scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});