import './ApprovalSidebar.css'
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { CallCountsAPI } from '../../apis/ApprovalAPICalls';
import { useSelector, useDispatch } from 'react-redux';

function ApprovalSidebar() {
    const [active, setActive] = useState(false);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [processingCount, setProcessingCount] = useState(0); // 결재 진행 대기 숫자 상태

    const [inboxClicked, setInboxClicked] = useState(false);
    const [inboxMenuHeight, setInboxMenuHeight] = useState('300px');
    const [inboxSectionHeight, setInboxSectionHeight] = useState('345px');
    const [inboxdropdown, setInboxDropdown] = useState('/Approval/opened_dropdown.png');

    const [outboxClicked, setOutboxClicked] = useState(false);
    const [outboxMenuHeight, setOutboxMenuHeight] = useState('180px');
    const [outboxSectionHeight, setOutboxSectionHeight] = useState('225px');
    const [outboxdropdown, setOutboxDropdown] = useState('/Approval/opened_dropdown.png');

    const [viewClicked, setViewClicked] = useState(false);
    const [viewMenuHeight, setViewMenuHeight] = useState('60px');
    const [viewSectionHeight, setViewSectionHeight] = useState('115px');
    const [viewdropdown, setViewDropdown] = useState('/Approval/opened_dropdown.png');

    useEffect(() => {
        setActive(true);
    }, []);

    const handleInboxClick = () => {
      setInboxClicked(prevState => !prevState);
      setInboxMenuHeight(prevHeight => (prevHeight === '0px' ? '300px' : '0px'));
      setInboxSectionHeight(prevHeight => (prevHeight === '45px' ? '345px' : '45px'));
      setInboxDropdown(prevDropdown =>
        prevDropdown === '/Approval/dropdown.png' ? '/Approval/opened_dropdown.png' : '/Approval/dropdown.png'
      );
    };
    
    const handleOutboxClick = () => {
      setOutboxClicked(prevState => !prevState);
      setOutboxMenuHeight(prevHeight => (prevHeight === '0px' ? '180px' : '0px'));
      setOutboxSectionHeight(prevHeight => (prevHeight === '45px' ? '225px' : '45px'));
      setOutboxDropdown(prevDropdown =>
        prevDropdown === '/Approval/dropdown.png' ? '/Approval/opened_dropdown.png' : '/Approval/dropdown.png'
      );
    };

    const handleViewClick = () => {
      setViewClicked(prevState => !prevState);
      setViewMenuHeight(prevHeight => (prevHeight === '0px' ? '60px' : '0px'));
      setViewSectionHeight(prevHeight => (prevHeight === '45px' ? '115px' : '45px'));
      setViewDropdown(prevDropdown =>
        prevDropdown === '/Approval/dropdown.png' ? '/Approval/opened_dropdown.png' : '/Approval/dropdown.png'
      );
    };

    const writingApprovalHandler = () => {
      navigate('writing');
    }

    const resetSelectedMenus = () => {
      setSelectedInboxMenu(null);
      setSelectedOutboxMenu(null);
      setSelectedViewMenu(null);
    };

    const inboxHandler = (value) => {

      switch (value) {
        case 'onProcessList':
          navigate('onProcessList');
          break;

        case 'completed':
          navigate('completed');
          break;

        case 'rejected':
          navigate('rejected');
          break;

        case 'retrieved':
          navigate('retrieved');
          break;
          
          case 'saved':
            navigate('saved');
            break;

        default:
          break;
      }
    }

    const outboxHandler = (value) => {

      switch (value) {
        case 'inbox':
          navigate('inbox');
          break;

        case 'inboxFinished':
          navigate('inboxFinished');
          break;

        case 'inboxRejectedList':
          navigate('inboxRejectedList');
          break;

        default:
          break;
      }
    }

    const viewHandler = (value) => {

      switch (value) {
        case 'referenceList':
          navigate('referenceList');
          break;

        default:
          break;
      }
    }

        // 각 섹션의 선택한 메뉴 상태를 추가 상태로 관리합니다.
    const [selectedInboxMenu, setSelectedInboxMenu] = useState(null);
    const [selectedOutboxMenu, setSelectedOutboxMenu] = useState(null);
    const [selectedViewMenu, setSelectedViewMenu] = useState(null);

    // 선택 상태 업데이트
    const handleInboxMenuClick = (menu) => {
      setSelectedInboxMenu(menu);
      inboxHandler(menu);
    };

    const handleOutboxMenuClick = (menu) => {
      setSelectedOutboxMenu(menu);
      outboxHandler(menu);
    };
    const handleViewMenuClick = (menu) => {
      setSelectedViewMenu(menu);
      viewHandler(menu);
    };

    const handleDocWritingButtonClick = () => {
      resetSelectedMenus();
    };
    

    return (
        <>
        <div className={`approval_wrapper ${active ? 'active' : ''}`}>
              <div className="approval_sidemenu">
    <div className="approval_sidemenu_on">
      <div className="title">전자 결재</div>
      <div className="doc_writing_button" onClick={() => { writingApprovalHandler(); handleDocWritingButtonClick(); }}>
        <div className="writing_text">기안서 작성</div>
      </div>
      <div className="status">
        <div className="processing">
          <span className="processing_count">11</span>
          <span className="processing_title">결재 진행</span>
        </div>

        <div className="count_title">
          <span className="on_count">1</span>          
          <span className="on_title">결재 대기</span>
        </div>
      </div>
    </div>
      <div className="inbox" style={{height: inboxSectionHeight}}>
        <div className="inbox_title_section">
          <img className="inbox_drop_down" src={inboxdropdown}/>
          <div className="inbox_title" onClick={handleInboxClick}>결재 상신함</div>
        </div>
        <div className="inbox_menu_section" style={{height: inboxMenuHeight}}>
          <div className={`side_on_process ${selectedInboxMenu === 'onProcessList' ? 'bold' : ''}`} onClick={() => handleInboxMenuClick('onProcessList')}>
            <span className="inbox_text">결재 진행함</span>
          </div>
          <div className={`side_completed ${selectedInboxMenu === 'completed' ? 'bold' : ''}`} onClick={() => handleInboxMenuClick('completed')}>
            <span className="inbox_text">결재 완료함</span>
          </div>
          <div className={`side_rejected ${selectedInboxMenu === 'rejected' ? 'bold' : ''}`} onClick={() => handleInboxMenuClick('rejected')}>
            <span className="inbox_text">반려 문서함</span>
          </div>
          <div className={`side_retrieved ${selectedInboxMenu === 'retrieved' ? 'bold' : ''}`} onClick={() => handleInboxMenuClick('retrieved')}>
            <span className="inbox_text">회수 문서함</span>
          </div>
          <div className={`side_saved ${selectedInboxMenu === 'saved' ? 'bold' : ''}`} onClick={() => handleInboxMenuClick('saved')}>
            <span className="inbox_text">임시 저장</span>
          </div>
        </div>
      </div>

      <div className="outbox" style={{height: outboxSectionHeight}}>
        <div className="outbox_title_section">
          <img className="outbox_drop_down" src={outboxdropdown}/>
          <span  className="outbox_title" onClick={handleOutboxClick}>결재 수신함</span>
        </div>
        <div className="outbox_menu_section" style={{height: outboxMenuHeight}}>

          <div className={`awating ${selectedOutboxMenu === 'inbox' ? 'bold' : ''}`} onClick={() => handleOutboxMenuClick('inbox')}>
            <span className="outbox_text">결재 대기함</span>
          </div>
          <div className={`out_completed ${selectedOutboxMenu === 'inboxFinished' ? 'bold' : ''}`} onClick={() => handleOutboxMenuClick('inboxFinished')}>
            <span className="outbox_text">결재 완료함</span>
          </div>
          <div className={`represent ${selectedOutboxMenu === 'inboxRejectedList' ? 'bold' : ''}`} onClick={() => handleOutboxMenuClick('inboxRejectedList')}>
            <span className="outbox_text">반려 문서함</span>
          </div>
        </div>
      </div>
      
      <div className="view" style={{height: viewSectionHeight}}>
        <div  className="view_title_section">
          <img className="view_drop_down" src={viewdropdown}/>
          <span className="view_title"  onClick={handleViewClick}>열람함</span>
        </div>
        <div className={`view_menu_section ${selectedViewMenu === 'referenceList' ? 'bold' : ''}`} onClick={() => handleViewMenuClick('referenceList')}>
          <div className="view_menu">
            <span className="view_text">열람함</span>
          </div>
        </div>
      </div>
              </div>
  <Outlet />
        </div>
        </>
    );
}

export default ApprovalSidebar;