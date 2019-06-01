import * as React from 'react';
const { useState, useEffect } = React;
import axios from 'axios';
import Result from './Result';


const Form: React.FunctionComponent<{addToPlaylist(url: string): void, sendMessage(data: object, id: object):void, playVideo(id: string)}> = props => {
  const [formInput, setFormInput] = useState('');
  const [resultVisibility, setResultVisibility] = useState('is-overlay');
  const [data, setData] = useState([{
    "kind": "youtube#searchResult",
    "etag": "XpPGQXPnxQJhLgs6enD_n8JR4Qk/ECfaGbrSVac9-5lbIs2zkqKFcwA",
    "id": {
    "kind": "youtube#video",
    "videoId": "nM0xDI5R50E"
    },
    "snippet": {
    "publishedAt": "2018-10-10T09:00:06.000Z",
    "channelId": "UCweOkPb1wVVH0Q0Tlj4a5Pw",
    "title": "[MV] IU(아이유) _ BBIBBI(삐삐)",
    "description": "[MV] IU(아이유) _ BBIBBI(삐삐) *English subtitles are now available. :D (Please click on 'CC' button or activate 'Interactive Transcript' function) [Notice] 1theK ...",
    "thumbnails": {
    "default": {
    "url": "https://i.ytimg.com/vi/nM0xDI5R50E/default.jpg",
    "width": 120,
    "height": 90
    },
    "medium": {
    "url": "https://i.ytimg.com/vi/nM0xDI5R50E/mqdefault.jpg",
    "width": 320,
    "height": 180
    },
    "high": {
    "url": "https://i.ytimg.com/vi/nM0xDI5R50E/hqdefault.jpg",
    "width": 480,
    "height": 360
    }
    },
    "channelTitle": "1theK (원더케이)",
    "liveBroadcastContent": "none"
    }
    },
    {
    "kind": "youtube#searchResult",
    "etag": "XpPGQXPnxQJhLgs6enD_n8JR4Qk/h25mTUo3Sd7Vi7jE7yZ45_o1CPI",
    "id": {
    "kind": "youtube#video",
    "videoId": "d9IxdwEFk1c"
    },
    "snippet": {
    "publishedAt": "2017-04-21T09:00:05.000Z",
    "channelId": "UCweOkPb1wVVH0Q0Tlj4a5Pw",
    "title": "[MV] IU(아이유) _ Palette(팔레트) (Feat. G-DRAGON)",
    "description": "[MV] IU(아이유) _ Palette(팔레트) (Feat. G-DRAGON) *English subtitles are now available. :D (Please click on 'CC' button or activate 'Interactive Transcript' ...",
    "thumbnails": {
    "default": {
    "url": "https://i.ytimg.com/vi/d9IxdwEFk1c/default.jpg",
    "width": 120,
    "height": 90
    },
    "medium": {
    "url": "https://i.ytimg.com/vi/d9IxdwEFk1c/mqdefault.jpg",
    "width": 320,
    "height": 180
    },
    "high": {
    "url": "https://i.ytimg.com/vi/d9IxdwEFk1c/hqdefault.jpg",
    "width": 480,
    "height": 360
    }
    },
    "channelTitle": "1theK (원더케이)",
    "liveBroadcastContent": "none"
    }
    },
    {
    "kind": "youtube#searchResult",
    "etag": "XpPGQXPnxQJhLgs6enD_n8JR4Qk/4zKn7qprL3_Dun2g4clCQa1Pe1U",
    "id": {
    "kind": "youtube#channel",
    "channelId": "UC3SyT4_WLHzN7JmHQwKQZww"
    },
    "snippet": {
    "publishedAt": "2017-02-13T06:00:29.000Z",
    "channelId": "UC3SyT4_WLHzN7JmHQwKQZww",
    "title": "이지금 [IU Official]",
    "description": "아이유(IU) Official YouTube Channel.",
    "thumbnails": {
    "default": {
    "url": "https://yt3.ggpht.com/-7jB5DCruPMM/AAAAAAAAAAI/AAAAAAAAAAA/OXomesN1YaM/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
    },
    "medium": {
    "url": "https://yt3.ggpht.com/-7jB5DCruPMM/AAAAAAAAAAI/AAAAAAAAAAA/OXomesN1YaM/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
    },
    "high": {
    "url": "https://yt3.ggpht.com/-7jB5DCruPMM/AAAAAAAAAAI/AAAAAAAAAAA/OXomesN1YaM/s800-c-k-no-mo-rj-c0xffffff/photo.jpg"
    }
    },
    "channelTitle": "이지금 [IU Official]",
    "liveBroadcastContent": "upcoming"
    }
    },
    {
    "kind": "youtube#searchResult",
    "etag": "XpPGQXPnxQJhLgs6enD_n8JR4Qk/6BRofI07EEHBLLnxHehPddAKTlM",
    "id": {
    "kind": "youtube#video",
    "videoId": "FGQzGzoLiu0"
    },
    "snippet": {
    "publishedAt": "2019-05-24T09:00:04.000Z",
    "channelId": "UC3SyT4_WLHzN7JmHQwKQZww",
    "title": "[IU TV] HAPPY IU DAY (With. 유애나)",
    "description": "[IU TV] HAPPY IU DAY (Birthday Behind)",
    "thumbnails": {
    "default": {
    "url": "https://i.ytimg.com/vi/FGQzGzoLiu0/default.jpg",
    "width": 120,
    "height": 90
    },
    "medium": {
    "url": "https://i.ytimg.com/vi/FGQzGzoLiu0/mqdefault.jpg",
    "width": 320,
    "height": 180
    },
    "high": {
    "url": "https://i.ytimg.com/vi/FGQzGzoLiu0/hqdefault.jpg",
    "width": 480,
    "height": 360
    }
    },
    "channelTitle": "이지금 [IU Official]",
    "liveBroadcastContent": "none"
    }
    },
    {
    "kind": "youtube#searchResult",
    "etag": "XpPGQXPnxQJhLgs6enD_n8JR4Qk/viC_Qpx1pZoepvX01AghR6XLdEo",
    "id": {
    "kind": "youtube#video",
    "videoId": "42Gtm4-Ax2U"
    },
    "snippet": {
    "publishedAt": "2015-10-22T15:00:00.000Z",
    "channelId": "UCweOkPb1wVVH0Q0Tlj4a5Pw",
    "title": "[MV] IU(아이유) _ Twenty-three(스물셋)",
    "description": "[MV] IU(아이유) _ Twenty-three(스물셋) *English subtitles are now available. :D (Please click on 'CC' button or activate 'Interactive Transcript' function) :: iTunes ...",
    "thumbnails": {
    "default": {
    "url": "https://i.ytimg.com/vi/42Gtm4-Ax2U/default.jpg",
    "width": 120,
    "height": 90
    },
    "medium": {
    "url": "https://i.ytimg.com/vi/42Gtm4-Ax2U/mqdefault.jpg",
    "width": 320,
    "height": 180
    },
    "high": {
    "url": "https://i.ytimg.com/vi/42Gtm4-Ax2U/hqdefault.jpg",
    "width": 480,
    "height": 360
    }
    },
    "channelTitle": "1theK (원더케이)",
    "liveBroadcastContent": "none"
    }},
     {
    "kind": "youtube#searchResult",
    "etag": "XpPGQXPnxQJhLgs6enD_n8JR4Qk/viC_Qpx1pZoepvX01AghR6XLdEo",
    "id": {
    "kind": "youtube#video",
    "videoId": "42Gtm4-Ax2U"
    },
    "snippet": {
    "publishedAt": "2015-10-22T15:00:00.000Z",
    "channelId": "UCweOkPb1wVVH0Q0Tlj4a5Pw",
    "title": "[MV] IU(아이유) _ Twenty-three(스물셋)",
    "description": "[MV] IU(아이유) _ Twenty-three(스물셋) *English subtitles are now available. :D (Please click on 'CC' button or activate 'Interactive Transcript' function) :: iTunes ...",
    "thumbnails": {
    "default": {
    "url": "https://i.ytimg.com/vi/42Gtm4-Ax2U/default.jpg",
    "width": 120,
    "height": 90
    },
    "medium": {
    "url": "https://i.ytimg.com/vi/42Gtm4-Ax2U/mqdefault.jpg",
    "width": 320,
    "height": 180
    },
    "high": {
    "url": "https://i.ytimg.com/vi/42Gtm4-Ax2U/hqdefault.jpg",
    "width": 480,
    "height": 360
    }
    },
    "channelTitle": "1theK (원더케이)",
    "liveBroadcastContent": "none"
    }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "XpPGQXPnxQJhLgs6enD_n8JR4Qk/viC_Qpx1pZoepvX01AghR6XLdEo",
      "id": {
      "kind": "youtube#video",
      "videoId": "42Gtm4-Ax2U"
      },
      "snippet": {
      "publishedAt": "2015-10-22T15:00:00.000Z",
      "channelId": "UCweOkPb1wVVH0Q0Tlj4a5Pw",
      "title": "[MV] IU(아이유) _ Twenty-three(스물셋)",
      "description": "[MV] IU(아이유) _ Twenty-three(스물셋) *English subtitles are now available. :D (Please click on 'CC' button or activate 'Interactive Transcript' function) :: iTunes ...",
      "thumbnails": {
      "default": {
      "url": "https://i.ytimg.com/vi/42Gtm4-Ax2U/default.jpg",
      "width": 120,
      "height": 90
      },
      "medium": {
      "url": "https://i.ytimg.com/vi/42Gtm4-Ax2U/mqdefault.jpg",
      "width": 320,
      "height": 180
      },
      "high": {
      "url": "https://i.ytimg.com/vi/42Gtm4-Ax2U/hqdefault.jpg",
      "width": 480,
      "height": 360
      }
      },
      "channelTitle": "1theK (원더케이)",
      "liveBroadcastContent": "none"
      }}]);
  const onInput = event => {
    setFormInput(event.target.value);
  }

  const onKeyUp = event => {
    // setResultVisibility('container is-overlay is-relative')
    // if(event.key === 'Enter') {
    //   axios.get(
    //     process.env.URL + `/api/youtube/${formInput}`, {
    //     }).then(result => {
    //       console.log('Received response');
    //       setData(result.data);
    //       setFormInput('');
    //       setResultVisibility('container is-overlay is-relative')
    //   }).catch(err => console.error('Failed to retrieve search data'));
    // }
  }
  // below is code to grab searches on input change
  // useEffect(() => {
  //   axios.get(
  //     `http://localhost:3001/youtube/${formInput}`, {
  //   }).then(result => {
  //     console.log('Received response');
  //     setData(result.data);
  //   }).catch(err => console.error('Failed to retrieve search data'));
  // }, [formInput])
  


  const searchResults = data.map((result, i) => 
    <Result title={result.snippet} 
      key={i}
      id={result.id.videoId}
      setResultVisibility={setResultVisibility}
      addToPlaylist={props.addToPlaylist}
      sendMessage={props.sendMessage}
      playVideo={props.playVideo}
    />    
  )

  return (
    <>
      <div className="Search search-fixed-center">
        <input id='search'
          type="text"
          onKeyUp={onKeyUp}
          onInput={onInput}
          value={formInput}
          placeholder='Press Enter to search for videos'/>
      </div>
     
      {/* <div className={resultVisibility} id='result'>
      <div className="row center-result">
        {searchResults}
        </div>
        </div> */}
   
    </>
  )
}

export default Form;