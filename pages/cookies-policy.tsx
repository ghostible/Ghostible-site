// import { useEffect, useState } from 'react'
// import axios from 'axios'

const CookiesPolicyPage: React.FC = ({ }) => {
    return (
        <>
            <main className=" text-white min-h-screen px-4 py-20  policy_contact">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-center mb-2">
                    Cookies Policy
                    </h1>
                    <p className="text-center text-gray-400 mb-12 text-sm">03-10-2024</p>
                    <section className="mb-8">
                    <h2 className="text-2xl md:text-2xl font-semibold mb-2">Cookies Policy</h2>
                    <p className="text-gray-300">
                        This website uses cookies to enhance your browsing experience and
                        provide personalized content and advertisements. By using this
                        website, you consent to the use of cookies in accordance with this
                        policy.
                    </p>
                    </section>

                    <section className="mb-8">
                    <h2 className="text-2xl md:text-2xl font-semibold mb-2">What are cookies?</h2>
                    <p className="text-gray-300">
                        Cookies are small text files that are stored on your device
                        (computer, smartphone, tablet) when you visit a website. They are
                        widely used to make websites work more efficiently, as well as to
                        provide information to website owners.
                    </p>
                    </section>

                    <section className="mb-8">
                    <h2 className="text-2xl md:text-2xl font-semibold mb-2">How we use cookies</h2>
                    <p className="text-gray-300 mb-4">
                        We use cookies for several purposes:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>
                        <strong>Essential cookies:</strong> These cookies are necessary
                        for the website to function properly.
                        </li>
                        <li>
                        <strong>Analytics cookies:</strong> These cookies allow us to
                        recognize and count the number of visitors and understand how they
                        move around the site.
                        </li>
                        <li>
                        <strong>Functionality cookies:</strong> These cookies help us
                        personalize our content for you and remember your preferences.
                        </li>
                        <li>
                        <strong>Advertising cookies:</strong> These cookies are used to
                        deliver advertisements that are relevant to you and your
                        interests.
                        </li>
                    </ul>
                    </section>

                    <section className="mb-8">
                    <h2 className="text-2xl md:text-2xl font-semibold mb-2">Managing cookies</h2>
                    <p className="text-gray-300">
                        You can control and/or delete cookies as you wish. You can delete
                        all cookies that are already on your device and set most browsers to
                        prevent them from being placed. If you do this, however, you may
                        have to manually adjust some preferences every time you visit a
                        site, and some services and functionalities may not work.
                    </p>
                    </section>

                    <section>
                    <h2 className="text-2xl md:text-2xl font-semibold mb-2">Contact us</h2>
                    <p className="text-gray-300">
                        If you have any questions about our use of cookies, please contact
                        us:
                    </p>
                    </section>
                    <section className="mb-10 mt-10">
                        <h2 className="text-sm md:text-2xl font-semibold mb-2">tanjimislam27@gmail.com</h2>
                    </section>
                </div>
            </main>
        </>
    )
}

export default CookiesPolicyPage;