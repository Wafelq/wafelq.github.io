<div id="footer">
    <script>
        fetch("~/webroot/footer.html")
            .then(response => response.text())
            .then(data => document.getElementById("footer").innerHTML = data);
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
    </script>
</div>
<?php wp_footer(); ?>
</body>
</html>