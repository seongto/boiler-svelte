<script>
    import * as constants from '../../assets/js/constants.js';
    import { onMount } from 'svelte';

    let communityDone = [
        {
            "title": "내. 동년배들. 다. 커리어로. 콘텐츠 만든다.",
            "link": "https://www.instagram.com/p/B8swwiAnNkf/",
            "date": "2020-02-07",
        },{
            "title": "읽고해봐: 생각하는 힘은 유일한 무기가 된다",
            "link": "https://www.instagram.com/p/B9oJq6DnfqO/",
            "date": "2020-02-14",
        },{
            "title": "읽고해봐 온라인: 울트라러닝",
            "link": "https://www.instagram.com/p/B-LmxZvnEDC/",
            "date": "2020-03-21",
        },{
            "title": "프로젝트 플러스원: 22일 습관 만들기",
            "link": "https://www.instagram.com/p/B_t1Shnn2Vp/",
            "date": "2020-04-09",
        },{
            "title": "유니콘 스타트업 케이스 스터디",
            "link": "",
            "date": "2020-05-20",
        },
    ]

    let communityPlanned = [
        {
            "title": "프로젝트 플러스원: 22일 습관 만들기",
            "link": "https://www.notion.so/realwesen/6-5e8cdb0385d642c1b3c8348a0581a7f2",
            "date": "2020-06-09",
        },{
            "title": "유니콘 스타트업 케이스 스터디",
            "link": "https://www.notion.so/realwesen/Startup-Mini-MBA_Unicorn-Startup-Case-Study-a18005598aaa419cae48fc093e15c665",
            "date": "2020-06-17",
        },{
            "title": "읽고해봐: 빅 워크",
            "link": "https://www.notion.so/realwesen/6-109f69cb185040d0976bf4b4c2f94f0f",
            "date": "2020-06-20",
        },{
            "title": "프로젝트 정리 워크샵 : 야생에서 살아남는 나의 능력 발견!",
            "link": "https://www.notion.so/realwesen/c3e554f239b54442b89679d08a755786",
            "date": "2020-06-23",
        }
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

    let communityEventList;
    let boxWidth;
    let scrollWidth;
    let scrollX;  
    $: handleScroll(scrollX);  


    const mixArray = (a, b) => {  
        return 0.5 - Math.random();
    }  

    const handleScroll = (x) => {
        if (x){
            communityEventList.scrollTo(x, 0);
        } else if ( x === 0){
            communityEventList.scrollTo(x, 0);
        }
    }

    const handleScrollX = () => {
        scrollX = communityEventList.scrollLeft;
    }

    onMount(() => {
        console.log(scrollWidth);
        communityMessages = communityMessages.sort(mixArray);
        communityEventList.scrollTo((boxWidth*5.5)-(scrollWidth/2-20), 0);
    });
</script>

<div class="community-event-wrapper">
    <slot></slot>
    <ul bind:this={communityEventList} bind:clientWidth={scrollWidth} on:scroll={() => handleScrollX()}>
        {#each communityDone as item}
            {#if !item["link"]}
            <li class="c-done">
                <a href="javascript:void(0);" class="cme-box">
                    <p><span class="event-status">we did</span>{item["title"]}</p>
                    <span class="event-date">{item["date"]}</span>
                </a>
            </li>
            {:else}
            <li class="c-done">
                <a href={item["link"]} target="_blank" class="cme-box">
                    <p><span class="event-status">we did</span>{item["title"]}</p>
                    <span class="event-date">{item["date"]}</span>
                </a>
            </li>
            {/if}
        {/each}
        <li class="c-main" bind:clientWidth={boxWidth}>
            <div class="cme-box">
                <span class="arrow-left">swipe left. 지난 이벤트</span>
                <p>allius 커뮤니티 이벤트에 함께하세요.</p>
                <span class="arrow-right">swipe right. 예정된 이벤트</span>
            </div>
        </li>
        {#each communityPlanned as item}
            {#if !item["link"]}
            <li class="c-planned" >
                <a href="javascript:void(0);" class="cme-box">
                    <p><span class="event-status">upcoming</span>{item["title"]}</p>
                    <span class="event-date">{item["date"]}</span>
                </a>
            </li>
            {:else}
            <li class="c-planned">
                <a href={item["link"]} target="_blank" class="cme-box">
                    <p><span class="event-status">upcoming</span>{item["title"]}</p>
                    <span class="event-date">{item["date"]}</span>
                </a>
            </li>
            {/if}
        {/each}
        {#each communityMessages as item, idx}
            {#if idx < (5-communityPlanned.length)}
                <li class="c-msg">
                    <a href="javascript:void(0);" class="cme-box">{item["text"]}</a>
                </li>
            {/if}
        {/each}
    </ul>
    <input type="range" bind:value={scrollX} max={(boxWidth*11)-scrollWidth+50} >
</div>

<style lang="scss">
    @import '../../assets/scss/common.scss';

    .community-event-wrapper {

        ul {
            display: flex;
            overflow-x: auto;
            margin-top: 20px;
            flex-wrap: nowrap;
            width: auto;

            @include respond-to('w800') {
                font-size: 1.1em;
            }


            &::-webkit-scrollbar {
                display: none;
            }

            li {
                flex: 0 0 auto;
                font-family: $font-kr;
                display: block;
                margin-right: 3px;

                &:last-child {
                    margin-right: 0;
                }

                .cme-box {
                    display: flex;
                    width: 240px;
                    height: 240px;
                    background-color: $theme-color2;
                    padding: 14px;
                    color: white;
                    overflow-y: scroll;
                    flex-direction: column;
                    justify-content: space-between;

                    &::-webkit-scrollbar {
                        display: none;
                    }

                    p {
                        font-weight: 700;
                        font-size: 1.2em;
                        line-height: 1.4em;
                        margin-bottom: 5px;

                        .event-status {
                            font-size: 0.6em;
                            font-weight: 400;
                            line-height: 1em;
                            margin-top: 0;
                            margin-bottom: 5px;
                        }
                    }

                    span {
                        display: block;
                        font-size: 0.75em;
                        margin-top: 5px;
                    }

                    span.event-date {
                        text-align: left;
                        margin-top: 0;
                        padding-bottom: 10px;
                        font-size: 0.8em;
                    }
                }
            }

            li.c-main {
                padding: 5px;
                background-color: $sub-color1;

                .cme-box {
                    width: 230px;
                    height: 230px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background-color: $sub-color1;
                    color: white;
                    padding: 5px 15px 10px;
                    border: 1px solid white;

                    p {
                        font-size: 1em;
                    }

                    span {
                        font-size: 0.7em;
                    }

                    span.arrow-right {
                        text-align: right;
                    }
                }
            }

            li.c-planned {
                .cme-box {
                    background-color: $theme-color1;
                    color: $sub-color2;
                }
            }

            li.c-msg {
                .cme-box {
                    font-weight: 700;
                    font-size: 1.5em;
                    background-color: $sub-color2;
                    color: $sub-color1;
                    padding: 20px;
                }
            }
        }

        input[type=range] {
            display: block;
            margin-top: 22px;
            width: 300px;

            @include respond-to('w600') {
                display: none;
            }

            //기존 디자인 숨기기
            -webkit-appearance: none; 
            width: 100%;
            background: transparent;

            &::-webkit-slider-thumb {
                -webkit-appearance: none;
            }
            
            &:focus {
                outline: none;
            }

            &::-ms-track {
                width: 100%;
                cursor: pointer;

                background: transparent; 
                border-color: transparent;
                color: transparent;
            }

            // thumb 수정
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 24px;
                width: 8px;
                border-radius: 5px;
                background: lighten($theme-color1, 20%);
                cursor: pointer;
                margin-top: -9px;
                border: none;
            }

            &::-moz-range-thumb {
                height: 24px;
                width: 8px;
                border-radius: 5px;
                background: lighten($theme-color1, 20%);
                cursor: pointer;
                border: none;
            }

            &::-ms-thumb {
                height: 24px;
                width: 8px;
                border-radius: 5px;
                background: lighten($theme-color1, 20%);
                cursor: pointer;
                border: none;
            }

            // track 수정
            &::-webkit-slider-runnable-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: #f3f3f3;
                border-radius: 2px;
            }

            &:focus::-webkit-slider-runnable-track {
                background: #f3f3f3;
            }

            &::-moz-range-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: #f3f3f3;
                border-radius: 2px;
            }

            &::-ms-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: transparent;
                border-color: transparent;
                color: transparent;
            }

            &::-ms-fill-lower {
                background: #f3f3f3;
                border-radius: 2px;
            }

            &:focus::-ms-fill-lower {
                background: #f3f3f3;
            }

            &::-ms-fill-upper {
                background: #f3f3f3;
                border-radius: 2px;
            }

            &:focus::-ms-fill-upper {
                background: #f3f3f3;
            }

        }
    }
</style>