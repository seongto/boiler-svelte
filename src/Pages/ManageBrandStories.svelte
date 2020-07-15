<script>
    import * as constants   from '../assets/js/constants.js';
    import { catchError }   from '../assets/js/functions.svelte';
    
    import Header           from '../Components/Header.svelte';
    import Footer           from '../Components/Footer.svelte';

    import { onMount }      from 'svelte';
    import axios            from "axios";
    import { Link, navigate }   from "svelte-routing";
    import { slide }        from 'svelte/transition'

    let brandStories;
    let token = localStorage.getItem(constants.TOKEN_KEY);
    let newStoryDisplay = false;
    let newStory = {};

    const activateEdit = (idx) => {
        brandStories[idx].editing = true;
    }

    const submitChange = (story) => {
        axios({
            method: 'post',
            url: `http://${constants.SERVER_API}/admin-management/brand-stories/story/update`,
            headers: {
                "Authorization": token,
            },
            data: {
                "id": story.id,
                "title": story.title,
                "name": story.name,
                "description": story.description,
                "link_url": story.link_url,
            }
        })
        .then(resp => {
            reloadData();
        })
        .catch(function (error) {
            catchError(error);
        });
    }

    const submitNewStory = (story) => {
        axios({
            method: 'post',
            url: `http://${constants.SERVER_API}/admin-management/brand-stories/story/create`,
            headers: {
                "Authorization": token,
            },
            data: {
                "title": story.title,
                "name": story.name,
                "description": story.description,
                "link_url": story.link_url,
            }
        })
        .then(resp => {
            newStoryDisplay = false;
            newStory = {};
            reloadData();
        })
        .catch(function (error) {
            catchError(error);
        });
    }

    const deleteStory = (name, title, storyId) => {
        let confirm = prompt(`${name} 님의 ${title} 스토리를 삭제하려면 '삭제'라고 입력해주세요.`);
        
        if (confirm === '삭제'){
            axios({
                method: 'post',
                url: `http://${constants.SERVER_API}/admin-management/brand-stories/story/delete`,
                headers: {
                    "Authorization": token,
                },
                data: {
                    "story_id": storyId,
                }
            })
            .then(resp => {
                window.alert("삭제되었습니다.");
                reloadData();
            })
            .catch(function (error) {
                catchError(error);
            });
        }
    }

    const togglePublic = (storyId) => {
        axios({
            method: 'post',
            url: `http://${constants.SERVER_API}/admin-management/brand-stories/story/change-public`,
            headers: {
                "Authorization": token,
            },
            data: {
                "story_id": storyId,
            }
        })
        .then(resp => {
            reloadData();
        })
        .catch(function (error) {
            catchError(error);
        });
    }

    const reloadData = () => {
        axios({
            method: 'get',
            url: `http://${constants.SERVER_API}/admin-management/brand-stories/list`,
            headers: {
                "Authorization": token,
            }
        })
        .then(resp => {
            let stories = resp.data["brand_stories_list"];
            
            stories.forEach( story => {
                story.editing = false;
            });
            
            stories.sort(function(a, b){
                let keyA = a.is_public,
                    keyB = b.is_public;

                if(keyA > keyB) return -1;
                if(keyA < keyB) return 1;
                return 0;
            });

            brandStories = stories;
        })
        .catch(function (error) {
            catchError(error);
        });
    }

    onMount(() => {
        reloadData();
    });


</script>

<Header />
<div class="sections">
    <h2 class="section-title">Manage Brand Stories</h2>
    <p class="section-description">브랜드스토리 관리하기</p>
    {#if newStoryDisplay}
        <button class="create-btn save" on:click={()=>{submitNewStory(newStory);}}>저장</button>
        <button class="create-btn brb" on:click={()=>{ newStoryDisplay = false; newStory = {};}}>변경 취소</button>
        <ul class="new-story">
            <li class="name">
                <strong>이름</strong><input type="text" placeholder="누구의 스토리인가요?" bind:value={newStory.name}>
            </li>
            <li class="title">
                <strong>제목</strong><input type="text" placeholder="제목을 정해주세요." bind:value={newStory.title}>
            </li>
            <li class="link">
                <strong>링크</strong><input type="text" placeholder="참고할 링크주소를 입력해주세요." bind:value={newStory.link_url}>
            </li>
            <li class="description">
                <strong>설명</strong><input type="text" placeholder="스토리 상세내용을 입력해주세요." bind:value={newStory.description}>
            </li>
        </ul>
    {:else}
        <button class="create-btn" on:click={()=>{ newStoryDisplay = true; }}>새로운 스토리 만들기</button>
    {/if}
    <ul class="section-contents">
        {#if brandStories}
            {#each brandStories as story, idx}
                <li>
                    <button class={story.is_public? "public-btn on-public" : "public-btn"} on:click={()=>togglePublic(story.id)}>{story.is_public? "공개 중" : "비공개 중"}</button>
                    {#if !story.editing}
                        <button class="edit-btn" on:click={()=>activateEdit(idx)}>편집</button>
                        <div class="name">
                            <strong>이름</strong><span>{story.name}</span>
                        </div>
                        <div class="title">
                            <strong>제목</strong><span>{story.title}</span>
                        </div>
                        <div class="link">
                            <strong>링크</strong><span>{story.link_url}</span>
                        </div>
                        <div class="description">
                            <strong>설명</strong><span>{story.description}</span>
                        </div>
                    {:else}
                        <button class="edit-btn" on:click={()=>submitChange(story)}>저장</button>
                        <button class="brb" on:click={()=>{reloadData()}}>변경 취소</button>
                        <button class="brb delete-btn" on:click={()=>deleteStory(story.name, story.title, story.id)}>스토리 삭제</button>
                        <div class="name">
                            <strong>이름</strong><input type="text" bind:value={story.name}>
                        </div>
                        <div class="title">
                            <strong>제목</strong><input type="text" bind:value={story.title}>
                        </div>
                        <div class="link">
                            <strong>링크</strong><input type="text" bind:value={story.link_url}>
                        </div>
                        <div class="description">
                            <strong>설명</strong><input type="text" bind:value={story.description}>
                        </div>
                    {/if}
                        
                </li>
            {/each}
        {/if}
    </ul>
</div>
<Footer />


<style lang="scss">
    @import '../assets/scss/common.scss'; 

    .sections {
        background-color: white;
        max-width: $wrapper;
        margin: 100px auto 0;
        padding: 0px 30px;
        font-size: $font-size;
        font-family: $font-kr;
        word-break: keep-all;

        @include respond-to('w1000') {
            font-size: $font-size * 0.9;
        }

        @include respond-to('w800') {
            font-size: $font-size * 0.8;
        }

        @include respond-to('w600') {
            padding: 0 12px;
        }

        .section-title {
            font-size: 1.2em;
            font-weight: 700;
            color: $theme-color1;
        }

        .section-description {
            font-size: 0.8em;
            color: $sub-color1;
            margin-top: 6px;

            @include respond-to('w600') {
                width: 100%;
            }
        }

        .create-btn {
            padding: 4px 15px;
            min-width: 80px;
            border: 1px solid $theme-color2;
            border-radius: 20px;
            background-color: white;
            color: $theme-color2;
            transition: all 0.2s;
            margin-bottom: 20px;

            &:hover {
                cursor: pointer;
                border-width: 2px;
                font-weight: 700;
                padding: 3px 14px;
            }

            &.brb {
                border: none;
                color: rgb(231, 121, 121);
                padding: 4px 0;
                min-width: 0;
                margin-left: 15px;
            }
        }

        .new-story {
            font-size: 0.7em;
            overflow: hidden;

            li {
                padding: 5px 3px;
                color: $sub-color1;
                background-color: white;
                display: flex;


                strong {
                    font-weight: 300;
                    color: $theme-color1;
                    letter-spacing: 8px;
                    display: inline-block;
                    width: 70px;
                    flex-shrink: 0;
                }

                input {
                    border: none;
                    width: 100%;
                    font-size: 0.9em;
                    padding: 2px 0;
                    border-bottom: 1px solid #eeeeee;

                    &::placeholder {
                        color: #cccccc;
                    }
                }
            }
        }

        .section-contents {
            font-size: 0.7em;
            margin-top: 40px;

            li {
                display: block;
                margin-bottom: 30px;
                padding-top: 20px;

                button {
                    display: inline-block;
                    padding: 4px 10px;
                    min-width: 100px;
                    border: none;
                    border-bottom: 1px solid #cccccc;
                    background-color: white;
                    color: #cccccc;
                    transition: all 0.2s;
                    margin: 0 10px 10px 0;

                    &:hover {
                        border-width: 3px;
                        padding-bottom: 2px;
                        font-weight: 700;
                        cursor: pointer;
                    }

                    &.on-public {
                        border-color: $theme-color1;
                        color: $theme-color1;
                    }

                    &.edit-btn {
                        border-color: $theme-color2;
                        color: $theme-color2;
                        letter-spacing: 6px;
                        text-indent: 6px;
                    }

                    &.brb {
                        border: none;
                        padding: 4px 0;
                        font-size: 0.8em;
                        min-width: 0;
                        margin-left: 15px;
                    }

                    &.delete-btn {
                        color: rgb(231, 121, 121);
                    }
                }

                div {
                    padding: 5px 3px;
                    color: $sub-color1;
                    background-color: white;
                    display: flex;

                    strong {
                        font-weight: 300;
                        color: $theme-color1;
                        letter-spacing: 8px;
                        display: inline-block;
                        width: 70px;
                        flex-shrink: 0;
                    }

                    span {
                        width: 100%;
                        display: inline-block;
                    }

                    input {
                        border: none;
                        width: 100%;
                        font-size: 0.9em;
                        padding: 2px 0;
                        border-bottom: 1px solid #eeeeee;
                    }
                }
            }
        }
    }

    :global(.sections::-webkit-scrollbar) {
        display: none;
    }

</style>