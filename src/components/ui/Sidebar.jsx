import { NavLink } from 'react-router'

export const Sidebar = () => {
  return (
    <div className="md:w-2/6 lg:w-3/12 xl:w-1/5 bg-gray-800">
        <div className="p-6">
            <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
                Restaurant App
            </p>
            <p className="mt-3 text-gray-600">
                Administra tu restaurant en las siguientes opciones:
            </p>

            <nav className='mt-10'>
                <NavLink
                    to={'/'}
                    className={({isActive}) => 
                        isActive ? 'text-yellow-500 p-1 block hover:bg-yellow-500 hover:text-gray-900' : 
                        'p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900'
                    }
                >
                    Ordenes
                </NavLink>

                <NavLink
                    to={'/menu'}
                    className={({isActive}) => 
                        isActive ? 'text-yellow-500 p-1 block hover:bg-yellow-500 hover:text-gray-900' : 
                        'p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900'
                    }
                >
                    Menu
                </NavLink>
            </nav>

        </div>
    </div>
  )
}
