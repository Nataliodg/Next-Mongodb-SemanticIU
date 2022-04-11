import {Navbar} from './Navbar';
import Head from 'next/head';


export const Layout = ({children}) => {
    return <>
        <Head>
        <link rel="shortcut icon" href="/cerebro.png"/>
			<title>Task app (CRUD)</title>
		</Head>
        <Navbar/>
        {children}
    </>
}