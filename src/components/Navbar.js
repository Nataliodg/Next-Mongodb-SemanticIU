import { Menu, Container, Button } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { route } from 'next/dist/server/router';

export const Navbar = () => {
    
    const {query, push} = useRouter();
    
    return (
        <Menu 
            inverted
            borderless attached>
            <Container>
                <Menu.Item>
                    <Link href='/'>
                        <img src="/cerebro.png" alt="" />
                    </Link>
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Button inverted color='blue'
                                size="mini"
                                onClick={() => {!query.id ? push('tasks/new') : push('/') }}>
                            {!query.id  ? 'New Task' : 'Home'}
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    );
};