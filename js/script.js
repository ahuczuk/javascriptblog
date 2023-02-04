'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const clickedLinkAttribute = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(clickedLinkAttribute);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
}

const
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorsSelector = '.post-author';


function generateTitleLinks(customSelector = '') {

  /*remove contents of titleList*/

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  let html = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML');

    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log(links)
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();



function generateTags() {
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (allTags.indexOf(linkHTML) == -1) {
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
      /* END LOOP: for each tag */
    }

    /* END LOOP: for every article: */
  }

}

generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');


  /* find all tag links with class active */

  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */

  for (let activeLink of activeLinks) {

    /* remove class active */

    activeLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tagLink of tagLinks) {
    /* add class active */

    tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}


function addClickListenersToTags() {
  /* find all links to tags */
  const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  console.log(allTagsLinks)

  /* START LOOP: for each link */
  for (let allTagsLink of allTagsLinks) {

    /* add tagClickHandler as event listener for that link */

    allTagsLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }

}
addClickListenersToTags();

/* add authors to articles */

function generateAuthors() {

  /* find all articles */

  const allArticles = document.querySelectorAll(optArticleSelector);
  console.log(allArticles);

  /* START LOOP: for every article: */

  for (let article of allArticles) {

    /* find author wrapper */

    const authorsWrapper = article.querySelector(optArticleAuthorsSelector);
    console.log(authorsWrapper);

    /* make html variable with empty string */

    let html = '';

    /* get articles from articles attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    /* generate HTML of the link */

    const authorHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

    /* add generated code to html variable */

    html = html + authorHTML;
    /* insert HTML of all the links into the tags wrapper */
    authorsWrapper.innerHTML = html;
    /* END LOOP: for each tag */
  }

  /* END LOOP: for every article: */
}


generateAuthors();



function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');

  /* find all tag links with class active */

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeAuthors);

  /* START LOOP: for each active tag link */

  for (let activeAuthor of activeAuthors) {

    /* remove class active */

    activeAuthor.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);

  /* START LOOP: for each found tag link */

  for (let authorLink of authorLinks) {
    /* add class active */

    authorLink.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');

}


function addClickListenersToAuthors() {
  /* find all links to tags */
  const authorsLinks = document.querySelectorAll('a[href^="#author-"]');
  console.log(authorsLinks);

  /* START LOOP: for each link */
  for (let authorLink of authorsLinks) {

    /* add tagClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToAuthors();

