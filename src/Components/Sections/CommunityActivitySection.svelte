<script>
    import * as constants from '../../assets/js/constants.js';
    import { onMount } from 'svelte';

    let communityDone = [
        {
            "title": "event title",
            "description": "event description",
            "link": "https://www.instagram.com/allius.io/",
            "date": "2020-01-01",
        },{
            "title": "event title",
            "description": "event description",
            "link": "https://www.instagram.com/allius.io/",
            "date": "2020-01-01",
        },{
            "title": "event title",
            "description": "event description",
            "link": "https://www.instagram.com/allius.io/",
            "date": "2020-01-01",
        },{
            "title": "event title",
            "description": "event description",
            "link": "https://www.instagram.com/allius.io/",
            "date": "2020-01-01",
        },{
            "title": "event title",
            "description": "event description",
            "link": "https://www.instagram.com/allius.io/",
            "date": "2020-01-01",
        },
    ]

    let communityPlanned = [
        {
            "title": "event title",
            "description": "event description",
            "link": "https://blog.allius.io",
            "date": "2020-01-01",
        },{
            "title": "event title",
            "description": "event description",
            "link": "https://blog.allius.io",
            "date": "2020-01-01",
        },
    ]

    let communityMessages = [
        {
            "text": "프로젝트로 만난 사이",
            "link": "https://blog.allius.io",
        },{
            "text": "내 브랜드, 니 브랜드, 우리 프로젝트",
            "link": "https://blog.allius.io",
        },{
            "text": "프로젝트로 만든 브랜드",
            "link": "https://blog.allius.io",
        },{
            "text": "처음 뵙겠습니다",
            "link": "https://blog.allius.io",
        },{
            "text": "나의 경험이 브랜드가 되는 얼라이어스",
            "link": "https://blog.allius.io",
        },
    ]

    export let imgWidth;
    let communityEventList;

    const mixArray = (a, b) => {  
        return 0.5 - Math.random();
    }  

    onMount(() => {
        communityMessages = communityMessages.sort(mixArray);
        communityEventList.scrollTo((communityEventList.scrollWidth/11)*5 -10, 0);
    });

</script>

<div class="community-activity-wrapper">
    <slot></slot>
    <ul bind:this={communityEventList}>
        {#each communityDone as item}
            <li class="c-done">
                <a href={item["link"]} class="ca-box">
                    <p>{item["title"]}</p>
                    <span class="event-date">{item["date"]}</span>
                    <span>{item["description"]}</span>
                </a>
            </li>
        {/each}
        <li class="c-main">
            <div class="ca-box">
                <span class="arrow-left">swipe left. 지난 이벤트</span>
                <p>allius 커뮤니티 이벤트에 함께하세요.</p>
                <span class="arrow-right">swipe right. 예정된 이벤트</span>
            </div>
        </li>
        {#each communityPlanned as item}
            <li class="c-planned">
                <a href={item["link"]} class="ca-box">
                    <p>{item["title"]}</p>
                    <span class="event-date">{item["date"]}</span>
                    <span>{item["description"]}</span>
                </a>
            </li>
        {/each}
        {#each communityMessages as item, idx}
            {#if idx < (5-communityPlanned.length)}
                <li class="c-msg">
                    <a href={item["link"]} class="ca-box">{item["text"]}</a>
                </li>
            {/if}
        {/each}
    </ul>
</div>

<style lang="scss">
    @import '../../assets/scss/common.scss';

    .community-activity-wrapper {

        ul {
            display: flex;
            overflow-x: scroll;
            margin-top: 20px;

            &::-webkit-scrollbar {
                display: none;
            }

            li {
                font-family: $font-kr;
                display: block;
                margin-right: 3px;
                &:last-child {
                    margin-right: 0;
                }

                .ca-box {
                    display: block;
                    width: 240px;
                    height: 240px;
                    background-color: $theme-color2;
                    padding: 10px;
                    color: white;

                    p {
                        font-weight: 700;
                        font-size: 1.1em;
                    }

                    span {
                        display: block;
                        font-size: 0.8em;
                        margin-top: 5px;
                    }

                    span.event-date {
                        margin-top: 0;
                        padding-bottom: 5px;
                        border-bottom: 1px solid white;
                    }
                }
            }

            li.c-main {
                padding: 5px;
                background-color: $sub-color1;

                .ca-box {
                    width: 230px;
                    height: 230px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background-color: $sub-color1;
                    color: white;
                    padding: 5px 15px 10px;
                    border: 1px solid white;

                    span {
                        font-size: 0.7em;
                    }

                    span.arrow-right {
                        text-align: right;
                    }
                }
            }

            li.c-planned {
                .ca-box {
                    background-color: $theme-color1;
                    color: $sub-color2;

                    span.event-date {
                        border-bottom: 1px solid $sub-color2;
                    }
                }
            }

            li.c-msg {
                .ca-box {
                    font-weight: 700;
                    font-size: 1.5em;
                    background-color: $sub-color2;
                    color: $sub-color1;
                    padding: 20px;
                }
            }
        }
    }
</style>