import { useEffect, useState } from 'react'
import { useAlert } from '../../component/common/AlertContext'
import { insertUserProfileAPI, joinUserAPI } from '../../apis/AdminAPI'
import styles from './adminGroup.module.css'

function AdminGroup() {
    const { showAlert } = useAlert()
    useEffect(() => {
        //부서, 팀, 직급 가져오기
        //문제1. 이메일이 ROLE이 됨.
    }, [])
    const [profile, setProfile] = useState('')
    const [imageSrc, setImageSrc] = useState(null)
    const [data, setData] = useState({
        //기본 정보
        employee: {
            employeeDepartment: {
                departmentCode: '5' //팀 코드
            },
            employeeJob: {
                jobCode: '4' //직위 코드
            },
            employeeName: 'test', //이름
            employeeBirthDate: '2000-01-01', //생일
            employeeResidentNumber: '000000-0000000', //주민번호
            employeePhone: '010-0000-0000', //폰 번호
            employeeAddress: '서울특별시', //주소
            employeeJoinDate: new Date().toISOString().split('T')[0], //입사일
            employeeRetirementDate: new Date().toISOString().split('T')[0], //퇴사일 (회원가입이라 퇴사x)
            employeeId: 'test', //아이디
            employeePassword: 'test', //비밀번호
            employeeAssignedCode: '00000000', //사번
            employeeExternalEmail: 'test@test.com', //이메일
            employeeRole: 'ROLE_USER' //권한
        },

        career: {
            //경력
            careerStartDate: new Date().toISOString().split('T')[0], //시작일
            careerEndDate: new Date().toISOString().split('T')[0], //종료일
            careerPosition: '팀장', //직위
            careerCompanyName: '회사이름', //회사이름
            careerBusinessInformation: '자세한업무' //업무내용
        },

        education: {
            //학력
            educationName: '00대학교', //학력이름
            educationMajor: '00부', //전공
            educationGrades: '4.5', //학점
            educationAdmissionDate: '2011-03-01', //입학일
            educationGraduateDate: '2024-02-24' //졸업일
        }
    })
    const departmentHandler = e => {
        setData(a => ({
            ...a,
            employee: {
                ...a.employee,
                employeeDepartment: {
                    ...a.employee.employeeDepartment,
                    departmentCode: e.target.value
                },
                employeeJob: {
                    ...a.employee.employeeJob
                }
            },
            career: {
                ...a.career
            },
            education: {
                ...a.education
            }
        }))
    }
    const jobHandler = e => {
        setData(a => ({
            ...a,
            employee: {
                ...a.employee,
                employeeDepartment: {
                    ...a.employee.employeeDepartment
                },
                employeeJob: {
                    ...a.employee.employeeJob,
                    jobCode: e.target.value
                }
            },
            career: {
                ...a.career
            },
            education: {
                ...a.education
            }
        }))
    }
    useEffect(() => {
        if (profile && profile.type.startsWith('image/')) {
            const reader = new FileReader()

            reader.onload = e => {
                setImageSrc(e.target.result) // 읽어들인 이미지의 base64 인코딩된 URL을 상태로 설정
            }

            reader.readAsDataURL(profile) // 파일 내용을 읽어 Data URL 형식의 문자열로 반환
        }
    }, [profile])
    const setProfileHandler = e => {
        setProfile(e.target.files[0])
    }
    const eventHandler = e => {
        const { name, value } = e.target
        let section = e.target.getAttribute('data-section')

        setData(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [name]: value
            }
        }))
    }

    async function joinUser() {
        //회원가입 시키는 API 호출
        // const result = await joinUserAPI(data);
        // showAlert(`${result.message} 유저코드 : ${result.data.employee.employeeCode}`);
        const formData = new FormData()
        formData.append('profile', profile)
        const userProfileResult = await insertUserProfileAPI(formData)
        console.log(userProfileResult)
    }

    return (
        <div className={styles.group_page_wrap}>
            <div></div>
            <div className={styles.group_page}>
                <table className={styles.group_table}>
                    <colgroup>
                        <col style={{ width: '200px' }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td colSpan={'6'}>기본정보</td>
                        </tr>
                        <tr>
                            <td rowSpan={'4'} colSpan={'2'}>
                                {/* {imageSrc && (
                                    <img
                                        src={imageSrc}
                                        alt='Preview'
                                        style={{ width: '200px', height: 'auto' }}
                                    />
                                )} */}
                                <div
                                    style={{
                                        width: '200px',
                                        height: '300px',
                                        backgroundColor: 'hsl(12,92%,85%)',
                                        margin: '10px auto'
                                    }}
                                ></div>
                                <input
                                    accept='image/*'
                                    onChange={e => setProfileHandler(e)}
                                    type='file'
                                />
                            </td>
                            <td>
                                <span>입사일</span>
                            </td>
                            <td>
                                <input
                                    data-section='employee'
                                    name='employeeJoinDate'
                                    onChange={eventHandler}
                                    type='date'
                                    value={data.employee.employeeJoinDate}
                                />
                            </td>
                            <td>
                                <span>퇴사일자</span>
                            </td>
                            <td>
                                <input
                                    data-section='employee'
                                    name='employeeRetirementDate'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.employee.employeeRetirementDate}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>부서</span>
                            </td>
                            <td colSpan={'3'}>
                                <select name='department' value={data.department}>
                                    <option value=''>개발본부</option>
                                    <option value=''>부서2</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>팀</span>
                            </td>
                            <td colSpan={'3'}>
                                <select
                                    name='team'
                                    value={data.team}
                                    onClick={e => {
                                        departmentHandler(e)
                                    }}
                                >
                                    <option value='5'>총무팀</option>
                                    <option value='6'>회계팀</option>
                                    <option value='7'>영업팀</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>직급</span>
                            </td>
                            <td colSpan={'3'}>
                                <select
                                    name='job'
                                    value={data.job}
                                    onClick={e => {
                                        jobHandler(e)
                                    }}
                                >
                                    <option value='5'>팀장</option>
                                    <option value='6'>팀원</option>
                                    <option value='4'>마켓팅본부장</option>
                                    <option value='3'>개발본부장</option>
                                    <option value='2'>영업본부장</option>
                                    <option value='1'>관리본부장</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={'6'}>
                                <span>이름</span>
                                <input
                                    data-section='employee'
                                    name='employeeName'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.employee.employeeName}
                                />
                                <span>생일</span>
                                <input
                                    data-section='employee'
                                    name='employeeBirthDate'
                                    onChange={eventHandler}
                                    type='date'
                                    value={data.employee.employeeBirthDate}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={'6'}>
                                <span>주민번호</span>
                                <input
                                    data-section='employee'
                                    name='employeeResidentNumber'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.employee.employeeResidentNumber}
                                />
                                <span>연락처</span>
                                <input
                                    data-section='employee'
                                    name='employeePhone'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.employee.employeePhone}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={'6'}>
                                <span>주소</span>
                                <input
                                    data-section='employee'
                                    name='employeeAddress'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.employee.employeeAddress}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={'6'}>
                                <span>아이디</span>
                                <input
                                    data-section='employee'
                                    name='employeeId'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.employee.employeeId}
                                />
                                <span>비밀번호</span>
                                <input
                                    data-section='employee'
                                    name='employeePassword'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.employee.employeePassword}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={'6'}>
                                <span>사번</span>
                                <input
                                    data-section='employee'
                                    name='employeeAssignedCode'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.employee.employeeAssignedCode}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={'6'}>
                                <span>권한</span>
                                <select
                                    data-section='employee'
                                    name='employeeRole'
                                    onChange={eventHandler}
                                    value={data.employeeRole}
                                >
                                    <option value='ROLE_ADMIN'>관리자</option>
                                    <option value='ROLE_USER'>유저</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={'6'}>
                                <span>이메일</span>
                                <input
                                    data-section='employee'
                                    name='employeeExternalEmail'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.employee.employeeExternalEmail}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={'6'}>
                                <span>최종학력</span>
                                <input
                                    data-section='education'
                                    name='educationName'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.education.educationName}
                                />
                                <span>전공</span>
                                <input
                                    data-section='education'
                                    name='educationMajor'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.education.educationMajor}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={'6'}>
                                <span>학점</span>
                                <input
                                    data-section='education'
                                    name='educationGrades'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.education.educationGrades}
                                />
                                <span>입학일</span>
                                <input
                                    data-section='education'
                                    name='educationAdmissionDate'
                                    onChange={eventHandler}
                                    type='date'
                                    value={data.education.educationAdmissionDate}
                                />
                                <span>졸업일</span>
                                <input
                                    data-section='education'
                                    name='educationGraduateDate'
                                    onChange={eventHandler}
                                    type='date'
                                    value={data.education.educationGraduateDate}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={'6'}>
                                <span>경력시작일</span>
                                <input
                                    data-section='career'
                                    name='careerStartDate'
                                    onChange={eventHandler}
                                    type='date'
                                    value={data.career.careerStartDate}
                                />
                                <span>경력종료일</span>
                                <input
                                    data-section='career'
                                    name='careerEndDate'
                                    onChange={eventHandler}
                                    type='date'
                                    value={data.career.careerEndDate}
                                />
                                <span>직위</span>
                                <input
                                    data-section='career'
                                    name='careerPosition'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.career.careerPosition}
                                />
                                <span>회사 이름</span>
                                <input
                                    data-section='career'
                                    name='careerCompanyName'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.career.careerCompanyName}
                                />
                                <span>업무 내용</span>
                                <input
                                    data-section='career'
                                    name='careerBusinessInformation'
                                    onChange={eventHandler}
                                    type='text'
                                    value={data.career.careerBusinessInformation}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button onClick={joinUser}>회원가입</button>
            </div>
        </div>
    )
}

export default AdminGroup
