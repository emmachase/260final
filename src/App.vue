<template>
  <div id="app">
    <header v-if="$route.name !== 'Login'">
      <nav>
        <router-link to="/gallery">Gallery</router-link>
        <router-link to="/list">List</router-link>
        <router-link to="/upload">Upload</router-link>        
      </nav>
      <div class="nav-right">
        <router-link to="/">Logout</router-link>
      </div>
    </header>
    <router-view/>
    <div class="source">
      Source at <a href="https://github.com/emmachase/260final">GitHub</a>
    </div>
  </div>
</template>

<style>
body {
    font-family: "Roboto", sans-serif;
}

input[type=text] {
    font-family: "Roboto";
}

input[type=password] {
    font-family: "Roboto";
    font-weight: 900;
}

.source {
  position: fixed;
  background: white;
  left: 0;
  bottom: 0;
  padding: 10px 16px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  border-top-right-radius: 8px;
}

.source a {
  color: #cc0e4d;
}

.textfield {
    margin: 16px;
}

.textfield input,
.textfield textarea {
    background: #dddde0;
    color: #121212;
    border: none;
    font-family: inherit;
    font-size: 18px;
    line-height: 40px;
    border-radius: 8px;
    width: 100%;
    outline: none;
    text-indent: 1em;
}

.textfield input::placeholder,
.textfield textarea::placeholder {
    font-weight: 900;
    opacity: 0.4;
}

.textfield textarea {
    resize: none;
    height: 130px;
    text-indent: 0;
    line-height: 1.2;
    padding: 12px 1em;
}

.textfield.error input,
.textfield.error textarea {
    background: #e4cad5;
    color: #30111b;
}

.textfield.error input::placeholder,
.textfield.error textarea::placeholder {
    color: #30111b;
}

@keyframes button-loading {
    0% {
        background: #eeeeef;
        color: #d4d4d6;
    }

    100% {
        background: #e6e6e8;
        color: #c7c7ca;
    }
}

.actions {
  display: flex;
}

.actions .button {
  margin-left: 8px;
}

.clickable {
    cursor: pointer;
}

.button {
    display: block;
    border: none;
    outline: none;
    background: #cc0e4d;
    color: #ffffff;
    font-size: 18px;
    line-height: 40px;
    border-radius: 8px;
    padding: 0 32px;
    min-width: 200px;
    text-align: center;
    cursor: pointer;
    font-weight: 900;
    text-transform: uppercase;
    transition: background 0.2s ease;
}

.button.inline {
    font-size: 12px;
    background: transparent;
    color: #cc0e4d;
    min-width: unset;
    line-height: 24px;
}

.button.inline:hover {
    color: white;
}

.button.wide {
    width: calc(100% - 32px);
}

.button.margin {
    margin: 16px;
}

.button:hover {
    background: #be0d48;
}

.button:active {
    background: #af0c42;
}

.button[disabled]:not(.hide-load), .button.disabled {
    background: #eeeeef;
    color: #d4d4d6;
    cursor: default;
}

.button.loading {
    animation: button-loading infinite alternate 0.5s 0.5s;
}

.positioner {
    width: 0;
    height: 0;
    position: relative;
}

.positioner.inline {
    display: inline-block;
}

.accent.primary {
    background: #cc0e4d;
}

.accent.light-primary {
    background: #f676a1;
}

.accent.muted-primary {
    background: #fbc8d9;
}

.accent.alt-color {
    background: white;
}

.accent.tiny {
    width: 8px;
    height: 8px;
    border-width: 8px !important;
}

.accent.little {
    width: 16px;
    height: 16px;
    border-width: 16px !important;
}

.accent.small {
    width: 32px;
    height: 32px;
    border-width: 32px !important;
}

.accent.medium {
    width: 64px;
    height: 64px;
    border-width: 64px !important;
}

.accent.huge {
    width: 112px;
    height: 112px;
    border-width: 112px !important;
}

@media (max-width: 1200px) {
    .accent.huge {
        width: 90px;
        height: 90px;
        border-width: 90px !important;
    }
}

@media (max-width: 1050px) {
    .accent.huge {
        display: none;
    }
}

.accent.triangle {
    width: 0;
    height: 0;
    box-sizing: content-box;
    border-right: solid white;
    border-bottom: solid transparent;
}

.accent.hemi-1 {
    border-top-left-radius: 100%;
}

.accent.hemi-2 {
    border-top-right-radius: 100%;
}

.accent.hemi-3 {
    border-bottom-left-radius: 100%;
}

.accent.hemi-4 {
    border-bottom-right-radius: 100%;
}

.accent.dot {
    border-radius: 100%;
}

.accent.offset {
    position: absolute;
    left: -42px;
    bottom: -42px;
}

.grid-2 {
    display: inline-grid;
    grid-template-columns: fit-content(0) fit-content(0);
}

.grid-4,
.dots {
    display: inline-grid;
    grid-template-columns: fit-content(0) fit-content(0) fit-content(0) fit-content(0);
}

.dots {
    position: relative;
    grid-gap: 12px;
    left: 0;
    top: -40px;
}

.dots.left {
    left: -20px;
}

.dots.right {
    left: 20px;
}

.page-accent {
    position: fixed;
    bottom: -8px;
    left: -10vw;
    z-index: -100;
}

.page-accent svg {
    width: 120vw;
    height: auto;
}

h1 {
    font-size: 36px;
    font-weight: 900;
    opacity: 0.8;
    margin: 0;
}

h3 {
    font-size: 14px;
    font-weight: 900;
    opacity: 0.6;
    margin: 0;
}

aside {
    font-size: 14px;
    opacity: 0.6;
    margin: 16px 0;
}

aside.thick {
    font-weight: 900;
    opacity: 0.3;
    margin: 0;
}

.twobreak {
    flex-direction: row;
}

@media (max-width: 900px) {
    .twobreak {
        flex-direction: column;
    }
}

.fullpage {
    height: 100vh;
}

.login-container {
    flex: 1;
    text-align: center;
    max-width: 400px;
}

.t-center {
    text-align: center;
}

.gcenter {
    display: grid;
    place-items: center;
}

.logo-image {
    object-fit: contain;
    width: 700px;
    height: 700px;
}

@media (max-width: 1400px) {
    .logo-image {
        width: 500px;
        height: 500px;
    }
}

@media (max-width: 1100px) {
    .logo-image {
        width: 400px;
        height: 400px;
    }
}

@media (max-width: 900px) {
    .logo-image {
        width: 300px;
        height: 300px;
    }
}

.content-wrapper {
    margin: auto;
    width: 100%;
    max-width: 1000px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, 160px);
    grid-gap: 32px;
    padding: 40px 0;
    justify-content: space-evenly;
}

.grid.infinite-scroll-component {
    overflow: visible !important;
}

.grid .im-card {
    position: relative;
    height: 160px;
    transition: box-shadow 0.25s;
    box-shadow: 0 5px 20px -2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
}

.grid .im-card:hover {
    box-shadow: 0 10px 30px -4px rgba(0, 0, 0, 0.5);
}

.grid .im-card.big {
    box-shadow: 0 25px 40px -10px rgba(0, 0, 0, 0.6);
}

.grid .im-card .react-loading-skeleton {
    pointer-events: none;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
}

.grid .im-card .main-content {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
}

.grid .im-card img,
.grid .im-card video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
}

.grid .im-card img.big,
.grid .im-card video.big {
    backdrop-filter: blur(15px);
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

.backdrop {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 10;
    visibility: visible;
}

.backdrop.in {
    animation: fadeIn 0.25s;
}

.backdrop:not(.in) {
    animation: fadeOut 0.25s;
    opacity: 0;
}

.loading-skeleton {
    background-color: #eee;
    background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
    background-size: 200px 100%;
    background-repeat: no-repeat;
    border-radius: 4px;
    display: inline-block;
    line-height: 1;
    width: 100%;
    transition: opacity 0.5s ease;
    opacity: 1;
}

@keyframes skeleton-keyframes {
    0% {
        background-position: -200px 0;
    }

    100% {
        background-position: calc(200px + 100%) 0;
    }
}

.uploadbox {
    position: relative;
    width: 480px;
    height: 480px;
    left: 0;
}

@media (max-width: 1100px) {
    .uploadbox {
        left: 25px;
        width: 400px;
        height: 400px;
    }
}

@media (max-width: 500px) {
    .uploadbox {
        left: 15px;
        width: 300px;
        height: 300px;
    }
}

.uploadbox.waiting {
    cursor: pointer;
}

.uploadbox .clickable:hover {
    fill-opacity: 0.1;
}

.uploadbox .clickable:active {
    fill-opacity: 0.2;
}

.uploadbox .close-btn:hover {
    cursor: pointer;
}

.uploadbox .close-btn:hover circle {
    fill: #D4D4D4;
}

.uploadbox .close-btn:hover:active circle {
    fill: #D0D0D0;
}

.fancy {
  font-style: italic;
}

/*

background: url(http://localhost:5080/ThiM.jpg?size=200);
animation: none;
background-position: center;
background-size: cover;
box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.25)

*/
.form-bar {
    padding: 24px;
}

@media (max-width: 900px) {
    .form-bar>* {
        max-width: 500px;
        margin: 0 32px;
    }
}

.form-entry .heading {
    margin: 0 0 8px;
    align-items: baseline;
}

.form-entry .heading .label {
    font-size: 24px;
    opacity: 0.65;
}

.form-entry .heading .optional {
    font-size: 12px;
    opacity: 0.45;
}

.form-entry .textfield {
    margin: 8px 0 0;
}

.form-entry:not(:first-of-type) {
    margin: 32px 0 0;
}

.submit {
    margin: 24px 0;
}

header {
    display: grid;
    position: relative;
    grid-template-columns: 1fr auto 1fr;
    padding: 24px;
    text-transform: uppercase;
}

header nav {
    display: flex;
    grid-column: 2;
}

header a {
    text-decoration: none;
    color: #121212;
    font-weight: 900;
    padding: 8px 16px;
    font-size: 18px;
    margin: 0 32px;
    opacity: 0.50;
}

@media (max-width: 900px) {
    header a {
        margin: 0 16px;
    }
}

@media (max-width: 750px) {
    header a {
        margin: 0 4px;
    }
}

@media (max-width: 600px) {
    header a {
        font-size: 14px;
    }
}

header a:hover {
    opacity: 0.70;
}

header a.router-link-exact-active {
    opacity: 1;
    color: #be5679;
}

header .hamburger {
    display: none;
    opacity: 0.5;
    top: 5px;
}

header .nav-right {
    display: flex;
    justify-content: flex-end;
}

header .nav-right a {
    margin: 0 16px;
}

@media (max-width: 750px) {
    header .nav-right a {
        margin: 0 8px;
    }
}

@media (max-width: 1100px) {
    header {
        grid-template-columns: 1fr 1fr;
    }

    header nav {
        grid-column: 1;
    }
}

@media (max-width: 600px) {
    header {
        padding: 14px;
    }
}

@media (max-width: 550px) {
    header {
        overflow: hidden;
        height: 60px;
        transition: height 0.2s ease;
    }

    header.open {
        height: 165px;
    }

    header nav {
        flex-direction: column;
    }

    header a {
        margin-bottom: 4px;
        height: 32px;
    }

    header .hamburger {
        display: block;
    }
}

.force-scroll {
    opacity: 0;
}

html,
body {
    height: 100%;
}

#approot {
    min-height: 100%;
    height: 100%;
}

body {
    margin: 0;
    color: #121212;
}

* {
    box-sizing: border-box;
}

/* List */

.list-container {
    background: white;
    box-shadow: 0 5px 20px -2px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 10rem;
}

.list-item {
    display: flex;
    align-items: center;
}

.spacer {
    flex: 1;
}

.list-item .name > a {
    font-weight: bold;
    text-decoration: none;
    color: rgba(0, 0, 0, 0.8);
    transition: color 0.2s ease;
    white-space: nowrap;
}

.list-item .name > a:hover, .clickable:hover {
    color: #cc0e4d;
}

.list-item .time, .list-item .desc {
    white-space: nowrap;
    opacity: 0.7;
    font-style: italic;
    margin-left: 0.25em;
}

.list-item .desc {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

hr {
    opacity: 0.2;
}

.mt-0 {
    margin-top: 0;
}
</style>
