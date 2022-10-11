<template>
    <div class="search-container">
        <h1 class="title">Search for a Github User</h1>
        <form id="searchForm">
            <input id="search" placeholder="Search..." class="input-field">
        </form>
    </div>
</template>

<script>
export default {
    name: "myHome",
    mounted() {
        let searchForm = document.getElementById("searchForm");
        let search = document.getElementById("search");

        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();

            search = search.value;

            window.location.href = `/user/${search}`
        })
    }
}
</script>

<style>
    .search-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;
        height: 90vh
    }

    .input-field {
        background-color: rgb(10, 10, 14);
        border-radius: 10px;
        border: none;
        box-shadow: 0 5px 10px rgba(164, 160, 185, 0.05), 0 15px 40px rgba(0, 0, 0, 0.1);
        color: rgb(255, 255, 255);
        font-family: inherit;
        font-size: 1rem;
        padding: 1rem;
        margin-bottom: 2rem;
    }

    .input-field:focus {
        outline: none;
    }

    .title {
        font-weight: 700;
        text-align: center;
        font-size: 3rem;
        margin: 0;
        padding: 2rem;
    }
</style>