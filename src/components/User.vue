<template>
    <div class="container">
        <div v-for="member in user" :key="member" class="userinfo">
            <img :src=member.avatar alt="avatar" class="avatar">
            <p class="username" id="username">{{ member.username }}</p>
            <p class="description">{{ member.bio }}</p>
            <p class="subtitle">Social Media:</p>
            <div class="social">
                <div class="twitter-container">
                    <a class="twitter-username" :href="`https://twitter.com/${member.twitter}`">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#007bff" class="bi bi-twitter icon" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                        </svg>
                        {{ member.twitter }}
                    </a>
                </div>

                <div class="blog-container">
                    <a class="blog-name" :href="`${member.blog}`" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="white" class="bi bi-house icon" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                            <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                        </svg>
                        {{member.blog.slice(0, 20)}}
                    </a>
                </div>
            </div>
            
            <p class="subtitle">Repositories:</p>
            <div class="repo-container">
                <div v-for="repo in userRepos" :key="repo" class="repo">
                    <p class="repo-name">{{ repo.name }}</p>
                    <a :href=repo.url class="repo-url" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";

export default {
    name: "myUser",
    data() {
        return {
            user: [],
            userRepos: []
        }
    },
    mounted() {
        let user = this.$route.params.id;

        axios.get(`https://api.github.com/users/${user}`).then(res => {
            let array = {
                avatar: res.data.avatar_url,
                username: res.data.name,
                bio: res.data.bio,
                twitter: res.data.twitter_username || "None",
                blog: res.data.blog || "None"
            }
            
            this.user.push(array)
            axios.get(res.data.repos_url).then(res2 => {
                if(res2.data.length === 0) return this.userRepos.push({
                    name: "No Repos",
                })

                res2.data.forEach(repo => {
                    let repoarray = {
                        name: repo.name,
                        created: repo.created_at,
                        description: repo.description || "None",
                        language: repo.language || "None",
                        star_count: repo.stargazers_count || "None",
                        url: repo.html_url
                    }

                    this.userRepos.push(repoarray)
                })
            })
        })
    }
}
</script>

<style>
    body {
        background-color: rgb(21, 23, 33);
        color: rgb(255, 255, 255);
        font-family: Arial, sans-serif;
    }

    .container {
        display: block;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-top: 60px;
    }

    .userinfo {
        background-color: rgb(10, 10, 14);
        padding: 25px 25px;
        border-radius: 15px;
        width: 500px;
        margin: 0px auto;
    }

    .avatar {
        border-radius: 50%;
        height: 250px;
        width: 250px;
    }

    .username {
        font-size: 22px;
    }

    .username:hover {
        color: rgb(24, 120, 199);
        cursor: pointer;
    }

    .repo-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .repo-container a {
        text-decoration: none;
    }

    .repo:hover {
        transform: scale(1.05);
    }

    .social {
        display: flex;
    }

    .blog-container {
        border-radius: 15px;
        background-color: #191a1f;
        margin: 12px;
        padding: 10px 15px;
        width: 200px;
        height: 25px;
        text-align: center;
        color: rgb(255, 255, 255);
        text-decoration: none;
    }

    .blog-name {
        text-decoration: none;
        position: relative;
        bottom: 7px;
        font-size: 17px;
        color: rgb(255, 255, 255)
    }

    .blog-container:hover {
        transform: scale(1.05);
    }

    .twitter-container {
        border-radius: 15px;
        background-color: #191a1f;
        margin: 12px;
        padding: 10px 15px;
        width: 200px;
        height: 25px;
        text-align: center;
        color: rgb(255, 255, 255);
        text-decoration: none;
    }
    
    .twitter-container:hover {
        transform: scale(1.05);
    }

    .twitter-username {
        text-decoration: none;
        position: relative;
        bottom: 8px;
        font-size: 17px;
        color: rgb(255, 255, 255)
    }

    .icon {
        position: relative;
        top: 5px;
        padding-left: 3px;
        color: #007bff;
    }

    .repo {
        background-color: #191a1f;
        width: 500px;
        border-radius: 10px;
        padding: 10px 15px;
        margin: 12px;
        height: 50px;
        text-align: start;
        color: rgb(255, 255, 255);
        text-decoration: none;
    }

    .repo-url {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        position: relative;
        bottom: 35px;
    }
</style>