import React, { useState, useEffect } from 'react';
import FriendList from './FriendList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import friendService from '../Services/friend.js'

const FriendInfo = () => {
  const [id, setId] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [receiveLists, setReceiveLists] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [sendList, setSendList] = useState([]);

  useEffect(() => {
    const fetchReceiveLists = async () => {
      try {
        const data = await friendService.getReceivedFriendRequests();
        setReceiveLists(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchReceiveLists();

    const fetchFriendList = async () => {
      try {
        const data = await friendService.getFriendList();
        setFriendList(data[0].friendId);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchFriendList();

    const fetchSendList = async () => {
      try {
        const data = await friendService.getSentFriendRequests();
        setSendList(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchSendList();
  }, [])

  const searchFriend = async () => {
    if (id.trim() === "") {
      window.alert("아이디를 입력해주세요");
    }
    else {
      const data = await friendService.searchFriend(id);
      setSearchResult(data);
      setShowResults(true);
    }
  };

  return(
    <div className="container mx-auto pt-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <div className='mt-5 w-full'>
        <div className='mb-2'>
          <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
              <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-main-color focus:border-main-color" 
              placeholder="친구 검색"
              onChange={(e) => setId(e.target.value)}/>
              <button className="text-white absolute end-2.5 bottom-2.5 bg-main-color hover:bg-gray-400 rounded-lg text-sm px-4 py-2"
              onClick={searchFriend}>검색</button>
          </div>
        </div>
        <div className="mx-auto border border-gray-300">
          {showResults && (
            <React.Fragment>
              {searchResult.length > 0 ? (
                searchResult.map((result, index) => (
                  <FriendList
                    key={index}
                    data={result}
                    option={"search"}
                  />
                ))
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
      
      <div className="userinfo text-sm flex items-start w-full mt-5 gap-x-2">
        <div className='w-full'>
          <div className='mb-2'>
            <div className='mb-2 font-semibold'>받은 친구 요청</div>
            <div className="border border-gray-300 max-h-48 overflow-y-auto">
              <div className="flex flex-col">
                {receiveLists.map((result, index) => (
                  <FriendList
                    key={index}
                    data={result}
                    option={"get"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
          <div className='mb-2'>
            <div className='mb-2 font-semibold'>신청한 친구 요청</div>
            <div className="border border-gray-300 max-h-48 overflow-y-auto">
              <div className="flex flex-col">
                {sendList.map((result, index) => (
                  <FriendList
                    key={index}
                    data={result}
                    option={"send"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5 w-full'>
        <div className='mb-2'>
          <div className='mb-2 text-sm font-semibold'>친구 목록</div>
          
          <div className="mx-auto border border-gray-300">
              {friendList.map((result, index) => (
                <FriendList
                  key={index}
                  data={result}
                  option={"list"}
                />
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}

export default FriendInfo;