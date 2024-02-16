import './ApprovalSidebar.css'
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";

function ApprovalSidebar() {
    const [active, setActive] = useState(false);
    let navigate = useNavigate();

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
          
        default:
          break;
      }
    }

    return (
        <>
        <div className={`approval_wrapper ${active ? 'active' : ''}`}>
              <div className="approval_sidemenu">
    <div className="approval_sidemenu_on">
      <div className="title">전자 결재</div>
      <div className="doc_writing_button" onClick={() => {writingApprovalHandler()}}>
        <div className="writing_text">기안서 작성</div>
      </div>
      <div className="status">
        <div className="processing">
          <span className="processing_count">2</span>
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
          <div className="on_process" onClick={() => { inboxHandler('onProcessList')}}>
            <span className="inbox_text">결재 진행함</span>
          </div>
          <div className="completed" onClick={() => { inboxHandler('completed')}}>
            <span className="inbox_text">결재 완료함</span>
          </div>
          <div className="rejected" onClick={() => { inboxHandler('rejected')}}>
            <span className="inbox_text">반려 문서함</span>
          </div>
          <div className="retrieved" onClick={() => { inboxHandler('retrieved')}}>
            <span className="inbox_text">회수 문서함</span>
          </div>
          <div className="saved">
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
          <div className="awating">
            <span className="outbox_text">결재 대기함</span>
          </div>
          <div className="out_completed">
            <span className="outbox_text">결재 완료함</span>
          </div>
          <div className="represent">
            <span className="outbox_text">대리 결재</span>
          </div>
        </div>
      </div>
      
      <div className="view" style={{height: viewSectionHeight}}>
        <div  className="view_title_section">
          <img className="view_drop_down" src={viewdropdown}/>
          <span className="view_title"  onClick={handleViewClick}>열람함</span>
        </div>
        <div className="view_menu_section" style={{height: viewMenuHeight}}>
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