import dashboard from '../../assets/dashboard.svg'
import leave from '../../assets/leave.svg'
import review from '../../assets/review.svg'
import task from '../../assets/task.svg'
import manifest from '../../assets/manifest.svg'
import logout from '../../assets/logout.svg'
import invoice from '../../assets/invoice.svg'
import leetcode from '../../assets/leetcode.svg'
import user from '../../assets/user.svg'
import SideBarItem from '../../components/SideBar/SideBarItem'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { stateType, resizeAction, sideBarAction } from '../../redux/store'
import './SideBar.css'

function SideBar() {

    const [style, setStyle] = useState<React.CSSProperties>({})
    const isSmall = useSelector((state: stateType) => state.isSmall)
    const isSideBar = useSelector((state: stateType) => state.isSideBar)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const item = (useLocation().pathname)

    const handleSideBarItems = (event: React.MouseEvent<HTMLDivElement>) => {
        navigate(`/${(event.currentTarget.children[1] as HTMLParagraphElement).innerHTML.toLocaleLowerCase()}`)
        isSmall ? dispatch(sideBarAction(!isSideBar)) : ''
    }

    useLayoutEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth < 1130) {
                localStorage.setItem('isSmall', 'true')
                dispatch(resizeAction(true))
            } else {
                localStorage.setItem('isSmall', 'false')
                dispatch(resizeAction(false))
            }
        };

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, [])

    useLayoutEffect(() => {
        setStyle((prev) => {
            return {
                ...prev,
                transform: isSmall ? 'translateX(-100%)' : 'translateX(0%)',
                opacity: 1,
                transition: 'all 0.3s ease-in-out',
            }
        })
    }, [isSmall]);

    useLayoutEffect(() => {
        setStyle((prev) => {
            return {
                ...prev,
                transform: isSideBar ? 'translateX(0%)' : isSmall ? 'translateX(-100%)' : 'translateX(0%)',
                opacity: 1,
                transition: 'all 0.3s ease-in-out',
            }
        })
    }, [isSideBar])

    return (
        <div style={style} className='w-[300px] h-full fixed z-20 left-0 shadow-xl flex flex-col justify-between sidebar bg-white'>
            <div className='overflow-auto overflow-x-hidden'>
                <SideBarItem color={item === '/dashboard' ? 'bg-gray-100' : ''} image={dashboard} text='Dashboard' handleSideBarItems={handleSideBarItems} />
                <SideBarItem color={item === '/reviews' ? 'bg-gray-100' : ''} image={review} text='Reviews' handleSideBarItems={handleSideBarItems} />
                <SideBarItem color={item === '' ? 'bg-gray-100' : ''} image={task} text='Tasks' handleSideBarItems={handleSideBarItems} />
                <SideBarItem color={item === '/leetcode' ? 'bg-gray-100' : ''} image={leetcode} text='Leetcode' handleSideBarItems={handleSideBarItems} />
                <SideBarItem color={item === '/leaves' ? 'bg-gray-100' : ''} image={leave} text='Leaves' handleSideBarItems={handleSideBarItems} />
                <SideBarItem color={item === '/invoice' ? 'bg-gray-100' : ''} image={invoice} text='Invoice' handleSideBarItems={handleSideBarItems} />
                <SideBarItem color={item === '/manifest' ? 'bg-gray-100' : ''} image={manifest} text='Manifest' handleSideBarItems={handleSideBarItems} />
                <SideBarItem color={item === '' ? 'bg-gray-100' : ''} image={logout} text='Logout' />
            </div>
            <div className='flex p-5 bg-gray-100'>
                <img className='w-8' src={user} alt="" />
                <div className='ml-5'>
                    <p className='font-medium'>Ahsan allaj pk</p>
                    <p className='font-medium'>MERN Stack</p>
                </div>
            </div>
        </div>
    )
}

export default SideBar
