<script>
    import * as constants from '../assets/js/constants.js';
    import { onMount } from 'svelte';

    let brStroies = [
        {
            "name" : "이름",
            "title" : "타이틀",
            "description" : "이것은 소개입니다. 이름은 이름입니다. 타이틀은 타이틀입니다. 얼라이어스.",
            "link" : "https://blog.allius.io",
        },{
            "name" : "이름",
            "title" : "타이틀",
            "description" : "이것은 소개입니다. 이름은 이름입니다. 타이틀은 타이틀입니다. 얼라이어스.",
            "link" : "https://blog.allius.io",
        },{
            "name" : "이름",
            "title" : "타이틀",
            "description" : "이것은 소개입니다. 이름은 이름입니다. 타이틀은 타이틀입니다. 얼라이어스.",
            "link" : "https://blog.allius.io",
        },{
            "name" : "이름",
            "title" : "타이틀",
            "description" : "이것은 소개입니다. 이름은 이름입니다. 타이틀은 타이틀입니다. 얼라이어스.",
            "link" : "https://blog.allius.io",
        },{
            "name" : "이름",
            "title" : "타이틀",
            "description" : "이것은 소개입니다. 이름은 이름입니다. 타이틀은 타이틀입니다. 얼라이어스.",
            "link" : "https://blog.allius.io",
        },
    ];

    let cmHistory = [
        {
            "date" : "2020-01-01",
            "title" : "지난 활동",
            "description" : "지난번에는 이러이러한 이벤트가 있었습니다. 참 좋았습니다. 끝",
            "link" : "https://blog.allius.io",
        },{
            "date" : "2020-02-01",
            "title" : "지난 활동",
            "description" : "지난번에는 이러이러한 이벤트가 있었습니다. 참 좋았습니다. 끝",
            "link" : "https://blog.allius.io",
        },{
            "date" : "2020-03-01",
            "title" : "지난 활동",
            "description" : "지난번에는 이러이러한 이벤트가 있었습니다. 참 좋았습니다. 끝",
            "link" : "https://blog.allius.io",
        },
    ]

    let cmComing = [
        {
            "date" : "2020-07-01",
            "title" : "새로운 활동",
            "description" : "이번에는 이러이러한 이벤트 예정입니다. 많은 참여 바랍니다. 끝",
            "link" : "https://blog.allius.io",
        },{
            "date" : "2020-07-01",
            "title" : "새로운 활동",
            "description" : "이번에는 이러이러한 이벤트 예정입니다. 많은 참여 바랍니다. 끝",
            "link" : "https://blog.allius.io",
        },{
            "date" : "2020-07-01",
            "title" : "새로운 활동",
            "description" : "이번에는 이러이러한 이벤트 예정입니다. 많은 참여 바랍니다. 끝",
            "link" : "https://blog.allius.io",
        },
    ]

    let tutorials = [
        {
            "text": "allius를 소개합니다",
            "finished": false,
            "link": "https://youtube.com",
            "public": true,
        },{
            "text": "프로젝트 만들기",
            "finished": false,
            "link": "https://youtube.com",
            "public": false,
        },{
            "text": "나의 브랜드 관리하기",
            "finished": false,
            "link": "https://youtube.com",
            "public": false,
        },{
            "text": "프로폴리오로 자랑하기",
            "finished": false,
            "link": "https://youtube.com",
            "public": false,
        },
    ]

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


    const mixArray = (a, b) => {  
        return 0.5 - Math.random();
    }  

    let winWidth = window.innerWidth;
    $: imgWidth = (winWidth > 1000) ? 400 : winWidth*0.4;
    $: cardWidth = (winWidth > 1000) ? 280 : winWidth*0.3;
    $: boxPadding = (winWidth > 1000) ? 30 : 0 ;

    let tutorialStage;
    let communityEventList;

    function clickToLink(target) {
        window.open(target);
    }

    function tutorialProgress(eventIdx){
        tutorialStage[eventIdx] = true;
        localStorage.setItem(constants.T_STAGE, JSON.stringify(tutorialStage));
        drawTutorialStage(tutorialStage);
    }

    function drawTutorialStage(stage){
        for ( let i = 0; i < stage.length; i++ ){
            tutorials[i]["status"] = stage[i];
        }
    }

    function scrollToCenter(){

    }


    onMount(() => {
        tutorialStage = JSON.parse(localStorage.getItem(constants.T_STAGE));

        if (tutorialStage) {
            drawTutorialStage(tutorialStage);
        } else {
            tutorialStage = [ false, false, false, false ];
        }

        communityMessages = communityMessages.sort(mixArray);

        communityEventList.scrollTo((communityEventList.scrollWidth/11)*5 -10, 0);
    });

</script>

<div class="header">
    <div class="header-wrapper">
        <a href="https://home.allius.io" class="logo">allius</a>
        <ul>
            <li>
                <a href="https://allius.io/desk" target="_blank">Login</a>
            </li>
        </ul>
    </div>
</div>
<div class="sections cover">
    <div class="title" style="height:{imgWidth};">
        <h1>나의 브랜드로<br>만드는 기회</h1>
        <p>나를 브랜딩하고,<br>새로운 프로젝트를 발견하세요.</p>
    </div>
    <img alt="cover-image" width={imgWidth} height={imgWidth} src="{constants.IMG_URL}/static-images/landing-main-sample.jpg">
</div>
<div class="sections brand-story">
    <h2 class="section-title">나만의 브랜드를 만들어가는 사람들을 만나보세요.</h2>
    <ul>
        {#each brStroies as item}
            <li on:click={() => clickToLink(item["link"])} style="width:{cardWidth}px; height:{cardWidth}px; min-width: 240px; min-height: 240px;">
                <span>{item["name"]}</span>
                <h3>{item["title"]}</h3>
                <p>{item["description"]}</p>
            </li>
        {/each}
    </ul>
</div>
<div class="sections why-allius" style="padding: 40px {boxPadding}px 80px">
    <div class="why-wrapper">
        <h2 class="section-title">why allius</h2>
        <p class="section-description">당신이 얼라이어스를 사용해야 하는 이유</p>
        <ul>
            <li>
                <img alt="allius benefit img1" src="{constants.IMG_URL}/static-images/landing-img01.jpg">
                <p>당신의 프로젝트 경험으로 새로운 사람들과 새로운 프로젝트 기회를 가질 수 있도록 기회의 멍석을 깔아드립니다.</p>
            </li>
            <li>
                <img alt="allius benefit img2" src="{constants.IMG_URL}/static-images/landing-img02.jpg">
                <p>얼얼라이어스와 함께 새로운 길을 발견하고 실행하며 영역을 확장하도록 지원하고, 응원합니다!</p>
            </li>
        </ul>
    </div>
</div>
<div class="sections tutorial">
    <h2 class="section-title">처음 오셨나요?</h2>
    <p class="section-description" style="max-width:{imgWidth*2}px;">당신의 브랜드를 만드는 공간, 스튜디오에 입장하세요. 새로운 사람들과 프로젝트 기회를 만드는 시작입니다.</p>
    <ul>
        {#each tutorials as item, index}
            <li class={ item["status"] ? "finished" : ""} >
            {#if item["public"]}
                <a href={item["link"]} target="_blank" on:click={() => tutorialProgress(index)} >
                    <p>0{index+1}</p>
                    <span>{item["text"]}</span>
                </a>
            {:else}
                <a class="not-opened">
                    <p>0{index+1}</p>
                    <span class="coming">coming soon</span>
                    <span>{item["text"]}</span>
                </a>
            {/if}
            </li>
        {/each}
    </ul>
</div>
<div class="sections community-activity">
    <h2 class="section-title">Community Activity</h2>
    <p class="section-description">allius 커뮤니티 활동에 참여하세요.</p>
    <ul bind:this={communityEventList}>
        {#each communityDone as item}
            <li class="c-done">
                <a href={item["link"]}>
                    <p>{item["title"]}</p>
                    <span class="event-date">{item["date"]}</span>
                    <span>{item["description"]}</span>
                </a>
            </li>
        {/each}
        <li class="c-main">
            <a>
                <span class="arrow-left">swipe left. 지난 이벤트</span>
                <p>allius 커뮤니티 이벤트에 함께하세요.</p>
                <span class="arrow-right">swipe right. 예정된 이벤트</span>
            </a>
        </li>
        {#each communityPlanned as item}
            <li class="c-planned">
                <a href={item["link"]}>
                    <p>{item["title"]}</p>
                    <span class="event-date">{item["date"]}</span>
                    <span>{item["description"]}</span>
                </a>
            </li>
        {/each}
        {#each communityMessages as item, idx}
            {#if idx < (5-communityPlanned.length)}
                <li class="c-msg">
                    <a href={item["link"]}>{item["text"]}</a>
                </li>
            {/if}
        {/each}
    </ul>
</div>

<div class="footer">
    <p class="company-name">주식회사 리얼비즌</p>
    <p class="company-info">
        사업자 등록 번호 : 152-81-00668<br>
        주소 : 서울 강남구 학동로 343, B2 청년창업센터 2호<br>
        문의 : allius@realwesen.com
    </p>
</div>


<style lang="scss">
    @import '../assets/scss/common.scss';

    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
        background-color: rgba(255,255,255,0.9);
        border-bottom: 1px solid rgba(0,0,0, 0.1);

        .header-wrapper {
            margin: 0 auto;
            max-width: $wrapper;
            padding: 12px 30px;
            display: flex;
            justify-content: space-between;

            @include respond-to('w600') {
                padding: 12px;
            }
            
            .logo {
                display: block;
                text-indent: -9999px;
                background-image: url("https://allius.io/assets/img/allius-logo.png");
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
                width: 65px;
                height: 23px;
            }

            li a {
                font-family: $font-kr;
                font-size: 12px;
                display: block;
                float: right;
                padding: 4px 12px;
                border-radius: 4px;
                color: $theme-color1;
                border: 1px solid $theme-color1;
            }
        }
    }

    .sections {
        background-color: white;
        max-width: $wrapper;
        margin: 0 auto;
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
    }

    .sections::-webkit-scrollbar {
        display: none;
    }

    .sections.cover {
        display: flex;
        justify-content: space-between;
        padding-top: 100px;
        margin-top: 0;

        @include respond-to('w600') {
            justify-content: left;
            flex-direction: column;
        }

        .title {
            font-family: $font-kr;
            align-self : center;

            @include respond-to('w600') {
                align-self: auto;
                padding: 30px 0;
            }

            h1 {
                font-size: 2em;
                line-height: 1.2em;
                color: $sub-color1;
            }

            p{
                margin-top: 15px;
                font-size: 0.9em;
                color: $theme-color1;
            }
        }

        img {
            border-radius: 8px;

            @include respond-to('w600') {
                margin-top: 20px;
                width: 100%;
                border-radius: 4px;
            }
        }
    }

    .sections.brand-story {
        margin-top: 100px;
        
        ul {
            margin-top: 30px;
            overflow-x : scroll;
            white-space: nowrap; 

            &::-webkit-scrollbar {
                display: none;
            }

            li {
                display: inline-block;
                white-space: normal;
                border : 1px solid black;
                border-radius : 8px;
                padding: 20px;
                height: 240px;
                margin-right: 15px;
                overflow: hidden;

                &:hover {
                    cursor: pointer;
                }

                span {
                    font-size: 0.6em;
                    color: $theme-color1;
                    display: block;
                }

                h3 {
                    font-size: 1em;
                    margin-bottom: 5px;
                }

                p{
                    font-size: 0.7em;
                }
            }
        }
    }

    .sections.why-allius {
        background-color: $sub-color1;
        margin-top: 50px;
        max-width: none;

        .why-wrapper {
            max-width: $wrapper;
            margin: 0 auto;
            padding: 0 30px;

            @include respond-to('w600') {
                padding: 0 12px;
            }

            .section-description {
                color: $sub-color2;
            }

            ul {
                display: flex;
                margin-top: 10px;

                @include respond-to('w600') {
                    flex-direction: column;
                }

                li {
                    margin-right: 20px;

                    &:last-child {
                        margin-right : 0;
                    }

                    @include respond-to('w600') {
                        margin: 30px 0 0;
                    }

                    img {
                        display: block;
                        width: 100%;
                        border-radius: 6px;

                        @include respond-to('w600') {
                            width: 70%;
                            margin: 0 auto;
                        }

                        @include respond-to('w400') {
                            width: 100%;
                            margin: 0 auto;
                        }
                    }

                    p {
                        font-size: 0.8em;
                        color: white;
                        padding: 6px;

                        @include respond-to('w600') {
                            padding: 12px 0;
                        }
                    }
                }
            }
        }

        
    }

    .sections.tutorial {
        margin-top: 80px;

        ul {
            display: flex;
            margin-top: 20px;
            justify-content: left;
            flex-wrap : wrap;
            
            li {
                display: block;
                margin-right: 15px;
                margin-top: 15px;

                &:hover {
                    cursor: pointer;
                }

                &:last-child {
                    margin-right: 0;
                }

                @include respond-to('w400') {
                    width: 100%;
                    margin-right: 0;
                }
                
                a {
                    display: block;
                    font-weight: 700;
                    background-color: white;
                    border: 4px solid $theme-color1;
                    border-radius: 12px;
                    padding: 10px;
                    width : 150px;
                    height: 150px;
                    font-size : 1em;
                    color: $theme-color1;

                    @include respond-to('w400') {
                        width: 100%;
                        height: 105px;
                    }
                }

                a.not-opened {
                    span {
                        color : lighten($theme-color1, 30%);
                        font-size: 0.8em;

                        &.coming {
                            display: block;
                            color: $theme-color1;
                        }
                    }
                }
            }

            li.finished {

                a {
                    background-color: $theme-color1;
                    color: white;

                    span {
                        color: rgba(255,255,255, 0.6);
                    }
                }
            }
        }
    }

    .sections.community-activity {
        margin-top: 100px;

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

                a {
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

                a {
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
                a {
                    background-color: $theme-color1;
                    color: $sub-color2;

                    span.event-date {
                        border-bottom: 1px solid $sub-color2;
                    }
                }


            }

            li.c-msg {
                a {
                    font-weight: 700;
                    font-size: 1.5em;
                    background-color: $sub-color2;
                    color: $sub-color1;
                    padding: 20px;
                }
            }
        }
    }
        

    .footer {
        max-width: $wrapper;
        margin: 100px auto 0;
        padding: 0 30px 50px;
        color: $sub-color1;
        font-family: $font-kr;
        font-size: 16px;

        @include respond-to('w600') {
            padding: 0 12px 30px;
        }
        

        .company-name {
            border-top: 2px solid $sub-color1;
            padding-top: 20px;
            font-weight: 700;
        }

        .company-info {
            font-size: 0.8em;
        }
        
    }
</style>