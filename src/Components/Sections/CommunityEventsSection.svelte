<script>
    import * as constants   from '../../assets/js/constants.js';
    import { onMount, tick, beforeUpdate } from 'svelte';
    import axios            from "axios";
    import { slide }        from 'svelte/transition';

    let eventsList;

    const mixArray = (a, b) => {  
        return 0.5 - Math.random();
    }  

    const listView = (lists, idx) => {
        eventsList[lists][idx].selected = !eventsList[lists][idx].selected;
    }

    onMount( async () => {
        axios.get(`http://${constants.SERVER_API}/page-management/community-events/list/landing`)
            .then(resp => {
                for (let lists in resp.data){
                    resp.data[lists].forEach( item => {
                        item.date = new Date(item["date"]);
                        item.selected = false;
                    });
                }
                return resp.data
            })
            .then(data => {
                eventsList = data;
            });
    });
</script>

<div class="community-events-wrapper">
    <slot></slot>
    <div class="list-wrapper">
        {#if eventsList}
        <ul class="upcoming-events">
            <li class="list-name">Upcoming</li>
            {#each eventsList.upcoming_events as item, idx}
                <li class="list-item unselected" on:click={()=>listView("upcoming_events", idx)}>
                    <p class="event-title">{item.title}</p>
                    <p class="event-date">{`${item.date.getFullYear()}년 ${item.date.getMonth()}월 ${item.date.getDate()}일`}</p>
                </li>
                {#if item.selected}
                    <li class="selected" transition:slide|local>
                        <span class="event-description">{item.description}</span>
                        {#if item.link_url}
                            <a href={item.link_url} target="_blank">바로가기</a>
                        {/if}
                    </li>
                {/if}
            {/each}
        </ul>
        <ul class="finished-events">
            <li class="list-name">We did</li>
            {#each eventsList.finished_events as item, idx}
                <li class="list-item unselected" on:click={()=>listView("finished_events", idx)}>
                    <p class="event-title">{item.title}</p>
                    <p class="event-date">{`${item.date.getFullYear()}년 ${item.date.getMonth()}월 ${item.date.getDate()}일`}</p>
                </li>
                {#if item.selected}
                    <li class="selected" transition:slide|local>
                        <span class="event-description">{item.description}</span>
                        {#if item.link_url}
                            <a href={item.link_url} target="_blank">바로가기</a>
                        {/if}
                    </li>
                {/if}
            {/each}
        </ul>
        {/if}
    </div>
</div>

<style lang="scss">
    @import '../../assets/scss/common.scss';

    .community-events-wrapper {

        .list-wrapper{
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            font-size: 0.9em;

            ul {
                display: block;
                width: 50%;
                padding-right: 20px;

                li {
                    display: block;

                    &.list-name {
                        border-left: 6px solid $theme-color1;
                        color: $theme-color1;
                        padding-left: 12px;
                        margin-bottom: 12px;
                        z-index: 30;
                    }

                    &.list-item {
                        font-size: 0.8em;
                        padding: 10px 3px;
                        color: $sub-color1;
                        border-top: 1px solid #cccccc;
                        background-color: white;

                        .event-title {
                            margin-bottom: 0;
                        }

                        .event-date {
                            display: block;
                            font-size: 0.8em;
                            color: $theme-color1;
                        }

                        &:hover {
                            cursor: pointer;
                            background-color: #f8f8f8;
                        }
                    }

                    &.selected {
                        font-size: 0.8em;
                        padding: 0px 3px 10px;
                        color: $sub-color1;
                        background-color:white;
                        z-index: 10;

                        a {
                            display: inline-block;
                            padding: 1px 12px;
                            background-color: $theme-color1;
                            border-radius: 10px;
                            color: white;
                            font-size: 0.7em;
                            margin-left: 20px;
                        }
                    }
                }
            }

            @include respond-to('w800') {
                font-size: 1em;
                display: block;

                ul {
                    width: 100%;
                    margin-bottom: 50px;
                    padding: 0;
                }
                
            }
        }
    }
</style>