const params =
    new URLSearchParams(
        window.location.search
    );

const chapterId =
    params.get("id");

fetch("data/chapters.json")

.then(response => response.json())

.then(chapters => {

    const chapter =
        chapters[chapterId];

    document.title =
        chapter.title;

    document.getElementById(
        "chapter-title"
    ).textContent =
        chapter.title;

    document.getElementById(
        "chapter-subtitle"
    ).textContent =
        chapter.subtitle;

    document.getElementById(
        "chapter-number"
    ).textContent =
        chapter.chapterNumber;

    document.documentElement
        .style
        .setProperty(
            "--chapter-bg",
            `url('${chapter.backgroundImage}')`
        );

    document.documentElement
        .style
        .setProperty(
            "--gold",
            chapter.accentColor
        );

    document.documentElement
        .style
        .setProperty(
            "--text",
            chapter.textColor
        );

    document.getElementById(
        "painting-origin"
    ).textContent =
        chapter.paintingOrigin;
});

fetch(
    `chapters/chapter_${chapterId}.html`
)

.then(response => response.text())

.then(html => {

    document
        .getElementById(
            "chapter-content"
        )
        .innerHTML =
        html;

});