document.addEventListener('DOMContentLoaded', function() {
    // For debugging, let's log that the script is loaded
    console.log('Form handler script loaded');
    
    // Supabase configuration
    const supabaseUrl = 'https://fpvreeivdbwhluculvsr.supabase.co'; // Replace with your actual URL
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwdnJlZWl2ZGJ3aGx1Y3VsdnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NjUyMTksImV4cCI6MjA0ODA0MTIxOX0.GwlsV6wNqwZk4VgBfVtYiWEBD15k-euHFyQnzhzdZP0'; // Replace with your actual key
    
    console.log('Supabase configuration:', { url: supabaseUrl, key: supabaseKey.substring(0, 5) + '...' });
    
    // Initialize Supabase client
    // This properly creates a new client rather than using the global 'supabase'
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    
    console.log('Supabase client created');
    
    // Handle form submission
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        console.log('Form found, adding event listener');
        
        leadForm.addEventListener('submit', async function(e) {
            console.log('Form submitted');
            // Prevent the default form submission which refreshes the page
            e.preventDefault();
            
            const submitSpinner = document.getElementById('submitSpinner');
            const submitText = document.getElementById('submitText');
            const formSuccess = document.getElementById('formSuccess');
            const formError = document.getElementById('formError');
            
            // Show loading state
            if (submitSpinner) submitSpinner.style.display = 'inline-block';
            if (submitText) submitText.textContent = 'SUBMITTING...';
            
            // Hide previous messages
            if (formSuccess) formSuccess.style.display = 'none';
            if (formError) formError.style.display = 'none';
            
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
                
                console.log('Submitting data to Supabase:', formData);
                
                // Insert into Supabase
                const { data, error } = await supabaseClient
                    .from('leads')
                    .insert([formData]);
                
                if (error) {
                    console.error('Supabase error:', error);
                    throw error;
                }
                
                console.log('Supabase success:', data);
                
                // Show success message
                if (formSuccess) formSuccess.style.display = 'block';
                leadForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                if (formError) formError.style.display = 'block';
            } finally {
                // Reset button state
                if (submitSpinner) submitSpinner.style.display = 'none';
                if (submitText) submitText.textContent = 'CLAIM YOUR FREE STRATEGY SESSION NOW';
            }
        });
    } else {
        console.error('Form element not found: #leadForm');
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