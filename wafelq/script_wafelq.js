function pokazFilmy(){
            document.getElementById("sekcja-filmy").style.display = 'block';
            document.getElementById("sekcja-muzyka").style.display = 'none';
            document.getElementById("sekcja-artysci").style.display = 'none';
            document.getElementById("sekcja-jedzonko").style.display = 'none';
            document.getElementById("sekcja-aktywnosci").style.display = 'none';
            document.getElementById("sekcja-historia").style.display = 'none';
        }
        function pokazMuzyka(){
            document.getElementById("sekcja-filmy").style.display = 'none';
            document.getElementById("sekcja-muzyka").style.display = 'block';
            document.getElementById("sekcja-artysci").style.display = 'none';
            document.getElementById("sekcja-jedzonko").style.display = 'none';
            document.getElementById("sekcja-aktywnosci").style.display = 'none';
            document.getElementById("sekcja-historia").style.display = 'none';
        }
        function pokazArtysci(){
            document.getElementById("sekcja-filmy").style.display = 'none';
            document.getElementById("sekcja-muzyka").style.display = 'none';
            document.getElementById("sekcja-artysci").style.display = 'block';
            document.getElementById("sekcja-jedzonko").style.display = 'none';
            document.getElementById("sekcja-aktywnosci").style.display = 'none';
            document.getElementById("sekcja-historia").style.display = 'none';
        }
        function pokazJedzonko(){
            document.getElementById("sekcja-filmy").style.display = 'none';
            document.getElementById("sekcja-muzyka").style.display = 'none';
            document.getElementById("sekcja-artysci").style.display = 'none';
            document.getElementById("sekcja-jedzonko").style.display = 'block';
            document.getElementById("sekcja-aktywnosci").style.display = 'none';
            document.getElementById("sekcja-historia").style.display = 'none';
        }
        function pokazAktywnosci(){
            document.getElementById("sekcja-filmy").style.display = 'none';
            document.getElementById("sekcja-muzyka").style.display = 'none';
            document.getElementById("sekcja-artysci").style.display = 'none';
            document.getElementById("sekcja-jedzonko").style.display = 'none';
            document.getElementById("sekcja-aktywnosci").style.display = 'block';
            document.getElementById("sekcja-historia").style.display = 'none';
        }
        function pokazHistoria(){
            document.getElementById("sekcja-filmy").style.display = 'none';
            document.getElementById("sekcja-muzyka").style.display = 'none';
            document.getElementById("sekcja-artysci").style.display = 'none';
            document.getElementById("sekcja-jedzonko").style.display = 'none';
            document.getElementById("sekcja-aktywnosci").style.display = 'none';
            document.getElementById("sekcja-historia").style.display = 'block';
        }
        function pokazWszystko(){
            document.getElementById("sekcja-filmy").style.display = 'block';
            document.getElementById("sekcja-muzyka").style.display = 'block';
            document.getElementById("sekcja-artysci").style.display = 'block';
            document.getElementById("sekcja-jedzonko").style.display = 'block';
            document.getElementById("sekcja-aktywnosci").style.display = 'block';
            document.getElementById("sekcja-historia").style.display = 'block';
        }