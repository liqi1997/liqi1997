import { Route, Switch, Link, useRouteMatch, useLocation } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState } from "react";

import styles from "./index.module.css";
import logo from "../assets/logo.svg";

import ErrorBoundary from '../components/ErrorBoundary'
import audio from "../store";
import Player from "../components/Player";
import Footer from '../components/Footer'

import Website from '../pages/Website'
import XMLY from '../pages/XMLY'

import store from '../store'

const Home = lazy(() => import('../pages/Home'))
const Me = lazy(() => import('../pages/Me'))
const Repo = lazy(() => import('../pages/Repo'))
const News = lazy(() => import('../pages/News'))
const Translate = lazy(() => import('../pages/Translate'))
const Todo = lazy(() => import('../pages/Todo'))
const Blog = lazy(() => import('../pages/Blog'))
const Weather = lazy(() => import('../pages/Weather'))
const Tool = lazy(() => import('../pages/Tool'))
const Echarts = lazy(() => import('../pages/Echarts'))
const Resume = lazy(() => import('../pages/Resume'))
const RSS = lazy(() => import('../pages/RSS'))
const Stock = lazy(() => import('../pages/Stock'))
const NotFound = lazy(() => import('../pages/NotFound'))

function Layout() {


    const { path, } = useRouteMatch();

    const { pathname, } = useLocation();

    useEffect(() => {

        if (window.location && window.location.search) {
            const { search } = window.location;
            if (search) {
                const arr = search.split('?code=')

                console.log('code', arr)

                if (arr.length > 0) {


                    // access_token: '4572c1ff3f13bc997a39deaeba2f99de',
                    // token_type: 'bearer',

                    // store.app.callFunction({
                    //     name: 'githubLogin',
                    //     data: {
                    //         code,
                    //     }
                    // }).then(res => {
                    //     console.log('res', res)
                    // }).catch(err => console.error)
                }
            }
        }
    }, []);



    const [visible, setVisible] = useState(false)

    // function handleLogin() {
    //     setVisible(true)
    // }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('login')

    function toggle() {
        if (status === 'login') {
            setStatus('register')
        } else {
            setStatus('login')
        }
    }

    function login() {

        if (!email) {
            alert('???????????????')
            return;
        }
        if (!password) {
            alert('???????????????')
            return;
        }

        if (status === 'login') {
            store.app
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((loginState) => {
                    console.log('login state', loginState.user)

                    // store.setUser();
                    // ????????????
                }).catch(err => {
                    console.error(err)
                })
        } else {
            store.app
                .auth()
                .signUpWithEmailAndPassword(email, password)
                .then(() => {
                    alert('?????????????????????????????????')
                }).catch(err => {
                    console.log('err', err)
                })
        }
    }


    return (
        <div className={styles.layout}>


            <header>

                <div className='container left'>

                    <Link className={`left`} to={path}>
                        <img className={styles.logo} src={logo} alt="logo" />
                        <h1 className={styles.appName}>???????????????</h1>
                    </Link>

                    <ul className={styles.tabBar}>
                        <li>
                            <Link className={`${styles.nav} ${pathname === path ? styles.active : ''}`} to={path}>
                                ??????</Link>
                        </li>
                        <li>
                            <Link className={`${styles.nav}  ${pathname.includes('stock') ? styles.active : ''}`} to={path + 'stock'}>??????</Link>
                        </li>
                        {/* <li>
                            <Link className={`${styles.nav} ${pathname.includes('blog') ? styles.active : ''} `} to={path + 'blog'}>??????</Link>
                        </li> */}

                        {/* <li>
                            <Link className={`${styles.nav}  ${pathname.includes('translate') ? styles.active : ''}`} to={path + 'translate'}>??????</Link>
                        </li> */}
                        <li>
                            <Link className={`${styles.nav}  ${pathname.includes('news') ? styles.active : ''}`} to={path + 'news'}>??????</Link>
                        </li>
                        <li>
                            <Link className={`${styles.nav}  ${pathname.includes('xmly') ? styles.active : ''}`} to={path + 'xmly'}>??????</Link>
                        </li>
                        {/* <li>
                            <Link className={`${styles.nav}  ${pathname.includes('rss') ? styles.active : ''}`} to={path + 'rss'}>RSS</Link>
                        </li> */}
                        <li>
                            <Link className={`${styles.nav}  ${pathname.includes('repo') ? styles.active : ''}`} to={path + 'repo'}>??????</Link>
                        </li>

                        {/* <li>
                            <Link className={`${styles.nav}  ${pathname.includes('website') ? styles.active : ''}`} to={path + 'website'}>????????????</Link>
                        </li> */}
                        {/* <li>
                            <Link className={`${styles.nav}  ${pathname.includes('todo') ? styles.active : ''}`} to={path + 'todo'}>????????????</Link>
                        </li>

                        <li>
                            <Link className={`${styles.nav}  ${pathname.includes('weather') ? styles.active : ''}`} to={path + 'weather'}>??????</Link>
                        </li>
                        <li>
                            <Link className={`${styles.nav}  ${pathname.includes('tool') ? styles.active : ''}`} to={path + 'tool'}>??????</Link>
                        </li> */}
                        {/* <li>
                            <Link className={`${styles.nav}  ${pathname.includes('echarts') ? styles.active : ''}`} to={path + 'echarts'}>????????????</Link>
                        </li> */}
                        {/* <li>
                            <Link className={`${styles.nav}  ${pathname.includes('resume') ? styles.active : ''}`} to={path + 'resume'}>??????</Link>
                        </li> */}
                        <li>
                            <Link className={`${styles.nav}  ${pathname === '/me' ? styles.active : ''}`} to={path + 'me'}>?????????</Link>
                        </li>
                    </ul>


                    {/* <a href={`https://gitee.com/oauth/authorize?client_id=6deabf8a317925c972edc28ebf7867294a1501b90ce8096e1b076e17b3b230d0&redirect_uri=http://localhost:3000&response_type=code`}>
                        <div className='button'>??????</div>
                    </a> */}
                </div>


            </header>

            <main>

                <ErrorBoundary>


                    <Suspense fallback={<div>Loading...</div>}>

                        <Switch>
                            <Route path={path} exact>
                                <Home />
                            </Route>

                            <Route path={path + 'stock'}>
                                <Stock />
                            </Route>
                            <Route path={path + 'blog'}>
                                <Blog />
                            </Route>

                            <Route path={path + 'translate'}>
                                <Translate />
                            </Route>
                            <Route path={path + 'repo'}>
                                <Repo />
                            </Route>
                            <Route path={path + 'news'}>
                                <News />
                            </Route>
                            <Route path={path + 'xmly'}>
                                <XMLY />
                            </Route>
                            <Route path={path + 'website'}>
                                <Website />
                            </Route>
                            <Route path={path + 'todo'}>
                                <Todo />
                            </Route>
                            <Route path={path + 'rss'}>
                                <RSS />
                            </Route>
                            <Route path={path + 'weather'}>
                                <Weather />
                            </Route>
                            <Route path={path + 'tool'}>
                                <Tool />
                            </Route>
                            <Route path={path + 'echarts'}>
                                <Echarts />
                            </Route>
                            <Route path={path + 'resume'}>
                                <Resume />
                            </Route>
                            <Route path={path + 'me'}>
                                <Me />
                            </Route>
                            <Route path='*'>
                                <NotFound />
                            </Route>
                        </Switch>

                    </Suspense>

                </ErrorBoundary>



                <Player audio={audio} />


                {visible && (
                    <div className={styles.alert}>

                        <div className={styles.alertContent}>

                            <div className={styles.alertTitle}>
                                <div>{status === 'login' ? '??????' : "??????"}</div>
                                <span className='iconfont icon-close' onClick={() => { setVisible(false) }} style={{ cursor: 'pointer' }}></span>
                            </div>

                            <div className={styles.alertBody}>

                                <input className={styles.input} type="text" placeholder='???????????????' value={email} onChange={(e) => { setEmail(e.target.value) }} />

                                <input className={styles.input} type="password" placeholder='???????????????' value={password} onChange={e => { setPassword(e.target.value) }} />

                                <div className={styles.button} onClick={login}>{status === 'login' ? '??????' : "??????"}</div>


                                <div>
                                    <span className={styles.toggle} onClick={toggle}>???
                                {status === 'login' ? '??????' : "??????"}

                                    </span>

                                </div>


                            </div>

                        </div>
                    </div>
                )}




            </main>

            <Footer />


        </div>
    )
}

export default Layout;