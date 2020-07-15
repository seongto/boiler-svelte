<script>
    import * as constants   from '../assets/js/constants.js';
    import { catchError }   from '../assets/js/functions.svelte';
    
    import Header           from '../Components/Header.svelte';
    import Footer           from '../Components/Footer.svelte';

    import { onMount }      from 'svelte';
    import axios            from "axios";
    import { Link, navigate }   from "svelte-routing";
    import { slide }        from 'svelte/transition'

    let communityEvents;
    let token = localStorage.getItem(constants.TOKEN_KEY);
    let newEventsDisplay = false;
    let newEvents = {
        "title": null,
        "description": null,
        "link_url": null,
        "date": null,
    };
    let timeNow = new Date();

    const activateEdit = (idx) => {
        communityEvents[idx].editing = true;
    }

    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const submitChange = (eventData) => {
        console.log(newEvents);
        axios({
            method: 'post',
            url: `http://${constants.SERVER_API}/admin-management/community-events/event/update`,
            headers: {
                "Authorization": token,
            },
            data: {
                "id": eventData.id,
                "title": eventData.title,
                "description": eventData.description,
                "link_url": eventData.link_url,
                "date": eventData.date + " 00:00:00",
            }
        })
        .then(resp => {
            reloadData();
        })
        .catch(function (error) {
            catchError(error);
        });
    }

    const submitNewEvents = (eventData) => {
        axios({
            method: 'post',
            url: `http://${constants.SERVER_API}/admin-management/community-events/event/create`,
            headers: {
                "Authorization": token,
            },
            data: {
                "title": eventData.title,
                "description": eventData.description,
                "link_url": eventData.link_url,
                "date": eventData.date + " 00:00:00",
            }
        })
        .then(resp => {
            newEventsDisplay = false;
            newEvents = {
                "title": null,
                "description": null,
                "link_url": null,
                "date": null,
            };
            reloadData();
        })
        .catch(function (error){
            catchError(error);
        });
    }

    const deleteEvent = (title, eventId) => {
        let confirm = prompt(`${title} 이벤트를 삭제하려면 '삭제'라고 입력해주세요.`);
        
        if (confirm === '삭제'){
            axios({
                method: 'post',
                url: `http://${constants.SERVER_API}/admin-management/community-events/event/delete`,
                headers: {
                    "Authorization": token,
                },
                data: {
                    "event_id": eventId,
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

    const togglePublic = (eventId) => {
        axios({
            method: 'post',
            url: `http://${constants.SERVER_API}/admin-management/community-events/event/change-public`,
            headers: {
                "Authorization": token,
            },
            data: {
                "event_id": eventId,
            }
        })
        .then(resp => {
            reloadData();
        })
        .catch(function (error) {
            catchError(error);
        });
    }

    const toggleStatus = (eventId) => {
        axios({
            method: 'post',
            url: `http://${constants.SERVER_API}/admin-management/community-events/event/change-status`,
            headers: {
                "Authorization": token,
            },
            data: {
                "event_id": eventId,
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
            url: `http://${constants.SERVER_API}/admin-management/community-events/list`,
            headers: {
                "Authorization": token,
            }
        })
        .then(resp => {
            let events = resp.data["events_list"];
            
            events.forEach( el => {
                el.date = formatDate(el.date);
                el.editing = false;
            });
            console.log(events);
            communityEvents = events;
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
    <h2 class="section-title">Manage Community Events</h2>
    <p class="section-description">커뮤니티 이벤트 관리하기</p>
    {#if newEventsDisplay}
        <button class="create-btn save" on:click={()=>{submitNewEvents(newEvents);}}>저장</button>
        <button class="create-btn brb" on:click={()=>{ newEventsDisplay = false; newEvents = {};}}>변경 취소</button>
        <ul class="new-event">
            <li class="title">
                <strong>제목</strong><input type="text" placeholder="제목을 정해주세요." bind:value={newEvents.title}>
            </li>
            <li class="date">
                <strong>날짜</strong><input type="date" placeholder="이벤트 날짜를 입력해주세요." bind:value={newEvents.date}>
            </li>
            <li class="link">
                <strong>링크</strong><input type="text" placeholder="참고할 링크주소를 입력해주세요." bind:value={newEvents.link_url}>
            </li>
            <li class="description">
                <strong>설명</strong><input type="text" placeholder="스토리 상세내용을 입력해주세요." bind:value={newEvents.description}>
            </li>
        </ul>
    {:else}
        <button class="create-btn" on:click={()=>{ newEventsDisplay = true; }}>새로운 스토리 만들기</button>
    {/if}
    <ul class="section-contents">
        {#if communityEvents}
            {#each communityEvents as el, idx}
                <li>
                    {#if el.status_id === 101}
                        <button class={"status-btn"} on:click={()=>toggleStatus(el.id)}>Upcoming</button>
                    {:else}
                        <button class={"status-btn finished"} on:click={()=>toggleStatus(el.id)}>Finished</button>
                    {/if}
                    <button class={el.is_public? "public-btn on-public" : "public-btn"} on:click={()=>togglePublic(el.id)}>{el.is_public? "공개 중" : "비공개 중"}</button>
                    {#if !el.editing}
                        <button class="edit-btn" on:click={()=>activateEdit(idx)}>편집</button>
                        <div class="title">
                            <strong>제목</strong><span>{el.title}</span>
                        </div>
                        <div class={(el.status_id===101)&&(el.date < timeNow)?"date warning" : "date"}>
                            <strong>날짜</strong><span>{el.date}</span>
                        </div>
                        <div class="link">
                            <strong>링크</strong><span>{el.link_url}</span>
                        </div>
                        <div class="description">
                            <strong>설명</strong><span>{el.description}</span>
                        </div>
                    {:else}
                        <button class="edit-btn" on:click={()=>submitChange(el)}>저장</button>
                        <button class="brb" on:click={()=>{reloadData()}}>변경 취소</button>
                        <button class="brb delete-btn" on:click={()=>deleteEvent(el.title, el.id)}>스토리 삭제</button>
                        <div class="title">
                            <strong>제목</strong><input type="text" bind:value={el.title}>
                        </div>
                        <div class="date">
                            <strong>날짜</strong><input type="date" bind:value={el.date}>
                        </div>
                        <div class="link">
                            <strong>링크</strong><input type="text" bind:value={el.link_url}>
                        </div>
                        <div class="description">
                            <strong>설명</strong><input type="text" bind:value={el.description}>
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

        .new-event {
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
                    font-family : $font-kr;
                    font-size: 0.9em;
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

                    &.status-btn {
                        border-color: $theme-color1;
                        color: $theme-color1;

                        &.finished {
                            border-color: $theme-color2;
                            color: $theme-color2;
                        }
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

                    &.warning {
                        color: red;
                    }

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