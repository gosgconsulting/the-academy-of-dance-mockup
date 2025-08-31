$(function(){$("body").one("pinegrow-ready",function(e,a){class s extends PgTutorialWhatsNew{constructor(){super(isApp()?"8.0":"1.0.13","Huge Tailwind Visual Editor improvements and a fresh new approach to responsive CSS styling."),this.name=`Tailwind Visual Editor`,this.prefix="tailwind_",this.lesson_Bunny(),this.lesson_CSSGrid(),isApp()&&this.lesson_ReleaseNotes("https://pinegrow.com/release_notes/pinegrow-8/")}lesson_CSSGrid(){var e=this.newLesson("css_grid");e.name="Tailwind CSS Grid",e.short_description="Use visual CSS grid editor to build a grid layout.",e.tags=["tailwind"],e.design_provider_key="tw",e.description=e.makeDesc("967636677",`<p>${e.short_description}</p>`,`<p>Watch the video and follow along in the editor.</p>`),e.addPage("index.html",`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Wave McSplash - About Me</title>
        <link href="tailwind_theme/tailwind.css" rel="stylesheet" type="text/css">
    </head>
    <body class="text-gray-800">
        <main>
            <div class="mx-auto p-6">
                <img src="https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDEyNXx8c3VyZmluZ3xlbnwwfHx8fDE3MTY0NjA2MDV8MA&ixlib=rb-4.0.3q=85&fm=jpg&crop=faces&cs=srgb&w=2000&h=2000&fit=crop" class="h-full hero-image object-contain w-full">
                <div class="relative">
                    <h1 class="font-bold text-6xl text-primary-600 xl:text-7xl 2xl:text-8xl">Wave McSplash</h1>
                    <p class="mt-2 text-2xl xl:text-3xl">Professional Surfer from Pineland</p>
                    <div>
                        <p class="mt-4 text-gray-600 lg:text-xl">🏄‍♂️ Catching waves and good vibes</p>
                        <p class="mt-2 text-gray-600 lg:text-xl">🌴 Living the dream one surf at a time</p>
                        <p class="mt-2 text-gray-600 lg:text-xl">&#128514; I make waves, not war</p>
                    </div>
                </div>
                <div class="space-y-6">
                    <a href="#favorite-spots" class="bg-blue-500 block py-4 rounded-lg shadow-md text-center text-white hover:bg-blue-600 lg:px-8">Favorite Surfing Spots</a>
                    <a href="#competition-wins" class="bg-green-500 block py-4 rounded-lg shadow-md text-center text-white hover:bg-green-600 lg:px-8">Competition Wins</a>
                    <a href="#surfing-tips" class="bg-yellow-500 block py-4 rounded-lg shadow-md text-center text-white hover:bg-yellow-600 lg:px-8">Surfing Tips</a>
                    <a href="https://instagram.com/wavemcsplash" class="bg-purple-500 block py-4 rounded-lg shadow-md text-center text-white hover:bg-purple-600 lg:px-8">Follow me on Instagram</a>
                    <a href="https://youtube.com/wavemcsplash" class="bg-red-500 block py-4 rounded-lg shadow-md text-center text-white hover:bg-red-600 lg:px-8">Subscribe to my YouTube Channel</a>
                    <a href="https://twitter.com/wavemcsplash" class="bg-blue-400 block py-4 rounded-lg shadow-md text-center text-white hover:bg-blue-500 lg:px-8">Follow me on Twitter</a>
                </div>
            </div>
            <section id="favorite-spots" class="bg-gray-100 py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Favorite Surfing Spots</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-lg">
                            <img src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDJ8fHN1cmZ8ZW58MHx8fHwxNzE4MTk1ODAyfDA&ixlib=rb-4.0.3&q=80&w=400" alt="Pipeline" class="w-full h-48 object-cover rounded-lg mb-4">
                            <h3 class="text-xl font-bold mb-2">Pipeline</h3>
                            <p class="text-gray-600">Pipeline is like the rollercoaster of the ocean. It's on Oahu's North Shore and it's my go-to spot when I need an adrenaline rush and a story to tell!</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-lg">
                            <img src="https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDl8fHN1cmZ8ZW58MHx8fHwxNzE4MTk1ODAyfDA&ixlib=rb-4.0.3&q=80&w=400" alt="Teahupo'o" class="w-full h-48 object-cover rounded-lg mb-4">
                            <h3 class="text-xl font-bold mb-2">Teahupo'o</h3>
                            <p class="text-gray-600">Teahupo'o in Tahiti is where I go to test my bravery. Those heavy, glassy waves are like nature's way of saying, "Are you sure about this?"</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-lg">
                            <img src="https://images.unsplash.com/photo-1526342122811-2a9c8512023d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDQ2fHxzdXJmfGVufDB8fHx8MTcxODE5NTgyNnww&ixlib=rb-4.0.3&q=80&w=400" alt="Jeffreys Bay" class="w-full h-48 object-cover rounded-lg mb-4">
                            <h3 class="text-xl font-bold mb-2">Jeffreys Bay</h3>
                            <p class="text-gray-600">Jeffreys Bay in South Africa is my favorite spot for catching long, fast barrels. Plus, the locals are awesome and the seafood is to die for!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="competition-wins" class="bg-white py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Competition Wins</h2>
                    <div class="space-y-6">
                        <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h3 class="text-xl font-bold mb-2">Big Wave Bonanza</h3>
                            <p class="text-gray-600">Conquered the monstrous waves and won the title of "King of the Ocean" while wearing a pineapple hat.</p>
                        </div>
                        <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h3 class="text-xl font-bold mb-2">Splash Fest Extravaganza</h3>
                            <p class="text-gray-600">Out-surfed everyone with a broken surfboard and still managed to pull off a perfect 10 trick named "The Pineapple Twist".</p>
                        </div>
                        <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h3 class="text-xl font-bold mb-2">Tidal Wave Triumph</h3>
                            <p class="text-gray-600">Defeated the reigning champion by riding a wave while eating a slice of pizza, earning the nickname "Wave McSplash, the Pizza Surfer".</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="surfing-tips" class="bg-gray-100 py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Surfing Tips</h2>
                    <div class="prose max-w-none mx-auto">
                        <p>Here are some of my top surfing tips to help you catch more waves and have more fun:</p>
                        <ul>
                            <li>
                                <strong>Tip 1:</strong> Always keep your eyes on the horizon to spot incoming waves early.
                            </li>
                            <li>
                                <strong>Tip 2:</strong> Practice your pop-up on land to improve your speed and balance.
                            </li>
                            <li>
                                <strong>Tip 3:</strong> Stay relaxed and don't panic if you wipe out. It's all part of the learning process.
                            </li>
                            <li>
                                <strong>Tip 4:</strong> Respect the ocean and other surfers. Good vibes only!
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section id="gallery" class="bg-white py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Image Gallery</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <img src="https://images.unsplash.com/photo-1519789110007-0e751882be76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDEyOHx8c3VyZnxlbnwwfHx8fDE3MTgxOTU4ODl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 1" class="w-full h-48 object-cover rounded-lg shadow-lg">
                        <img src="https://images.unsplash.com/photo-1601505804121-45e2c5506c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDQ5fHxzdXJmfGVufDB8fHx8MTcxODE5NTgyNnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 2" class="w-full h-48 object-cover rounded-lg shadow-lg">
                        <img src="https://images.unsplash.com/photo-1455729552865-3658a5d39692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDgzfHxzdXJmfGVufDB8fHx8MTcxODE5NTg3Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 3" class="w-full h-48 object-cover rounded-lg shadow-lg">
                        <img src="https://images.unsplash.com/photo-1475706997440-9f2a24435b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDg5fHxzdXJmfGVufDB8fHx8MTcxODE5NTg3Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 4" class="w-full h-48 object-cover rounded-lg shadow-lg">
                        <img src="https://images.unsplash.com/photo-1503022932596-500eb8cca2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDkwfHxzdXJmfGVufDB8fHx8MTcxODE5NTg3Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 5" class="w-full h-48 object-cover rounded-lg shadow-lg">
                        <img src="https://images.unsplash.com/photo-1551524358-f34c0214781d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDEyM3x8c3VyZnxlbnwwfHx8fDE3MTgxOTU4ODl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 6" class="w-full h-48 object-cover rounded-lg shadow-lg">
                    </div>
                </div>
            </section>
        </main>
        <footer class="bg-blue-600 text-white py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; 2023 Wave McSplash. All rights reserved.</p>
            </div>
        </footer>
    </body>
</html>`),e.addPage("finished.html",`<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>Wave McSplash - About Me</title>
        <link href="tailwind_theme/tailwind.css" rel="stylesheet" type="text/css">
    </head>
    <body class="text-gray-800">
        <main>
            <div class="auto-rows-auto gap-4 grid grid-cols-[1fr] mx-auto p-6 lg:grid lg:min-h-dvh lg:p-0 lg:[grid-template-areas:'._._._._._._._._._._.'_'._left_left_left_center_center_center_right_right_right_.'_'._._._._._._._._._._.'_'._links_links_links_links_links_links_._._._.'] lg:grid-cols-[3vw_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_3vw] lg:grid-rows-[140px_1fr_100px_1fr]">
                <img src="https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDEyNXx8c3VyZmluZ3xlbnwwfHx8fDE3MTY0NjA2MDV8MA&ixlib=rb-4.0.3q=85&fm=jpg&crop=faces&cs=srgb&w=2000&h=2000&fit=crop" class="h-full hero-image object-contain w-full lg:col-end-12 lg:col-start-1 lg:object-cover lg:object-top lg:row-end-5 lg:row-start-1">
                <div class="relative lg:pr-8 2xl:pr-28 lg:[grid-area:right]">
                    <h1 class="font-bold text-6xl text-primary-600 xl:text-7xl 2xl:text-8xl">Wave McSplash</h1>
                    <p class="mt-2 text-2xl xl:text-3xl">Professional Surfer from Pineland</p>
                    <div class="lg:mt-12">
                        <p class="mt-4 text-gray-600 lg:text-xl">🏄‍♂️ Catching waves and good vibes</p>
                        <p class="mt-2 text-gray-600 lg:text-xl">🌴 Living the dream one surf at a time</p>
                        <p class="mt-2 text-gray-600 lg:text-xl">&#128514; I make waves, not war</p>
                    </div>
                </div>
                <div class="space-y-6 lg:content-center lg:flex lg:flex-row lg:flex-wrap lg:gap-8 lg:pb-10 lg:relative lg:space-y-0 [&_>_a:nth-of-type(6n+1):hover]:bg-blue-600 [&_>_a:nth-of-type(6n+1)]:bg-blue-500 [&_>_a:nth-of-type(6n+2):hover]:bg-green-600 [&_>_a:nth-of-type(6n+2)]:bg-green-500 [&_>_a:nth-of-type(6n+3):hover]:bg-yellow-600 [&_>_a:nth-of-type(6n+3)]:bg-yellow-500 [&_>_a:nth-of-type(6n+4):hover]:bg-purple-600 [&_>_a:nth-of-type(6n+4)]:bg-purple-500 [&_>_a:nth-of-type(6n+5):hover]:bg-red-600 [&_>_a:nth-of-type(6n+5)]:bg-red-500 [&_>_a:nth-of-type(6n+6):hover]:bg-blue-500 [&_>_a:nth-of-type(6n+6)]:bg-blue-400 [&_>_a]:block [&_>_a]:py-4 [&_>_a]:rounded-lg [&_>_a]:shadow-md [&_>_a]:text-center [&_>_a]:text-white lg:[&_>_a]:px-8 lg:[grid-area:links]"><a href="#favorite-spots">Favorite Surfing Spots</a><a href="#competition-wins">Competition Wins</a><a href="#surfing-tips">Surfing Tips</a><a href="https://instagram.com/wavemcsplash">Follow me on Instagram</a><a href="https://youtube.com/wavemcsplash">Subscribe to my YouTube Channel</a><a href="https://twitter.com/wavemcsplash">Follow me on Twitter</a>
                </div>
            </div>
            <section id="favorite-spots" class="bg-gray-100 py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Favorite Surfing Spots</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div class="bg-white p-6 rounded-lg shadow-lg">
                            <img src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDJ8fHN1cmZ8ZW58MHx8fHwxNzE4MTk1ODAyfDA&ixlib=rb-4.0.3&q=80&w=400" alt="Pipeline" class="w-full h-48 object-cover rounded-lg mb-4">
                            <h3 class="text-xl font-bold mb-2">Pipeline</h3>
                            <p class="text-gray-600">Pipeline is like the rollercoaster of the ocean. It's on Oahu's North Shore and it's my go-to spot when I need an adrenaline rush and a story to tell!</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-lg">
                            <img src="https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDl8fHN1cmZ8ZW58MHx8fHwxNzE4MTk1ODAyfDA&ixlib=rb-4.0.3&q=80&w=400" alt="Teahupo'o" class="w-full h-48 object-cover rounded-lg mb-4">
                            <h3 class="text-xl font-bold mb-2">Teahupo'o</h3>
                            <p class="text-gray-600">Teahupo'o in Tahiti is where I go to test my bravery. Those heavy, glassy waves are like nature's way of saying, "Are you sure about this?"</p>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow-lg">
                            <img src="https://images.unsplash.com/photo-1526342122811-2a9c8512023d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDQ2fHxzdXJmfGVufDB8fHx8MTcxODE5NTgyNnww&ixlib=rb-4.0.3&q=80&w=400" alt="Jeffreys Bay" class="w-full h-48 object-cover rounded-lg mb-4">
                            <h3 class="text-xl font-bold mb-2">Jeffreys Bay</h3>
                            <p class="text-gray-600">Jeffreys Bay in South Africa is my favorite spot for catching long, fast barrels. Plus, the locals are awesome and the seafood is to die for!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="competition-wins" class="bg-white py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Competition Wins</h2>
                    <div class="space-y-6">
                        <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h3 class="text-xl font-bold mb-2">Big Wave Bonanza</h3>
                            <p class="text-gray-600">Conquered the monstrous waves and won the title of "King of the Ocean" while wearing a pineapple hat.</p>
                        </div>
                        <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h3 class="text-xl font-bold mb-2">Splash Fest Extravaganza</h3>
                            <p class="text-gray-600">Out-surfed everyone with a broken surfboard and still managed to pull off a perfect 10 trick named "The Pineapple Twist".</p>
                        </div>
                        <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
                            <h3 class="text-xl font-bold mb-2">Tidal Wave Triumph</h3>
                            <p class="text-gray-600">Defeated the reigning champion by riding a wave while eating a slice of pizza, earning the nickname "Wave McSplash, the Pizza Surfer".</p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="surfing-tips" class="bg-gray-100 py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Surfing Tips</h2>
                    <div class="prose max-w-none mx-auto">
                        <p>Here are some of my top surfing tips to help you catch more waves and have more fun:</p>
                        <ul>
                            <li>
                                <strong>Tip 1:</strong> Always keep your eyes on the horizon to spot incoming waves early.
                            </li>
                            <li>
                                <strong>Tip 2:</strong> Practice your pop-up on land to improve your speed and balance.
                            </li>
                            <li>
                                <strong>Tip 3:</strong> Stay relaxed and don't panic if you wipe out. It's all part of the learning process.
                            </li>
                            <li>
                                <strong>Tip 4:</strong> Respect the ocean and other surfers. Good vibes only!
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section id="gallery" class="bg-white py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Image Gallery</h2>
                    <div class="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 [&_>_img]:h-48 [&_>_img]:object-cover [&_>_img]:rounded-lg [&_>_img]:shadow-lg [&_>_img]:w-full">
                        <img src="https://images.unsplash.com/photo-1519789110007-0e751882be76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDEyOHx8c3VyZnxlbnwwfHx8fDE3MTgxOTU4ODl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 1">
                        <img src="https://images.unsplash.com/photo-1601505804121-45e2c5506c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDQ5fHxzdXJmfGVufDB8fHx8MTcxODE5NTgyNnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 2">
                        <img src="https://images.unsplash.com/photo-1455729552865-3658a5d39692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDgzfHxzdXJmfGVufDB8fHx8MTcxODE5NTg3Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 3">
                        <img src="https://images.unsplash.com/photo-1475706997440-9f2a24435b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDg5fHxzdXJmfGVufDB8fHx8MTcxODE5NTg3Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 4">
                        <img src="https://images.unsplash.com/photo-1503022932596-500eb8cca2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDkwfHxzdXJmfGVufDB8fHx8MTcxODE5NTg3Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 5">
                        <img src="https://images.unsplash.com/photo-1551524358-f34c0214781d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wyMDkyMnwwfDF8c2VhcmNofDEyM3x8c3VyZnxlbnwwfHx8fDE3MTgxOTU4ODl8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Gallery Image 6">
                    </div>
                </div>
            </section>
        </main>
        <footer class="bg-blue-600 text-white py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; 2023 Wave McSplash. All rights reserved.</p>
            </div>
        </footer>
    </body>
</html>`),e.addPage("tailwind_theme/tailwind.css",``),e.addPage("projectdb.pgml",`<project>
    <documents></documents>
    <dmdesigns>
        <dmdesign active>
            <dmdesignskill skill="tw.colors">
                <dmcolor key="gray" color="rgba(107,114,128,1)" shade-50="rgba(249,250,251,1)" shade-100="rgba(243,244,246,1)" shade-200="rgba(229,231,235,1)" shade-300="rgba(209,213,219,1)" shade-400="rgba(156,163,175,1)" shade-500="rgba(107,114,128,1)" shade-600="rgba(75,85,99,1)" shade-700="rgba(55,65,81,1)" shade-800="rgba(31,41,55,1)" shade-900="rgba(17,24,39,1)"/>
                <dmcolor key="red" color="rgba(239,68,68,1)" shade-50="rgba(254,242,242,1)" shade-100="rgba(254,226,226,1)" shade-200="rgba(254,202,202,1)" shade-300="rgba(252,165,165,1)" shade-400="rgba(248,113,113,1)" shade-500="rgba(239,68,68,1)" shade-600="rgba(220,38,38,1)" shade-700="rgba(185,28,28,1)" shade-800="rgba(153,27,27,1)" shade-900="rgba(127,29,29,1)"/>
                <dmcolor key="yellow" color="rgba(245,158,11,1)" shade-50="rgba(255,251,235,1)" shade-100="rgba(254,243,199,1)" shade-200="rgba(253,230,138,1)" shade-300="rgba(252,211,77,1)" shade-400="rgba(251,191,36,1)" shade-500="rgba(245,158,11,1)" shade-600="rgba(217,119,6,1)" shade-700="rgba(180,83,9,1)" shade-800="rgba(146,64,14,1)" shade-900="rgba(120,53,15,1)"/>
                <dmcolor key="green" color="rgba(16,185,129,1)" shade-50="rgba(236,253,245,1)" shade-100="rgba(209,250,229,1)" shade-200="rgba(167,243,208,1)" shade-300="rgba(110,231,183,1)" shade-400="rgba(52,211,153,1)" shade-500="rgba(16,185,129,1)" shade-600="rgba(5,150,105,1)" shade-700="rgba(4,120,87,1)" shade-800="rgba(6,95,70,1)" shade-900="rgba(6,78,59,1)"/>
                <dmcolor key="blue" color="blue" shade-50="#d9d9ff" shade-100="#c3b3ff" shade-200="#aa8dff" shade-300="#8b67ff" shade-400="#633fff" shade-500="blue" shade-600="#0001d3" shade-700="#0001a8" shade-800="#00017f" shade-900="#000059"/>
                <dmcolor key="indigo" color="rgba(99,102,241,1)" shade-50="rgba(238,242,255,1)" shade-100="rgba(224,231,255,1)" shade-200="rgba(199,210,254,1)" shade-300="rgba(165,180,252,1)" shade-400="rgba(129,140,248,1)" shade-500="rgba(99,102,241,1)" shade-600="rgba(79,70,229,1)" shade-700="rgba(67,56,202,1)" shade-800="rgba(55,48,163,1)" shade-900="rgba(49,46,129,1)"/>
                <dmcolor key="purple" color="rgba(139,92,246,1)" shade-50="rgba(245,243,255,1)" shade-100="rgba(237,233,254,1)" shade-200="rgba(221,214,254,1)" shade-300="rgba(196,181,253,1)" shade-400="rgba(167,139,250,1)" shade-500="rgba(139,92,246,1)" shade-600="rgba(124,58,237,1)" shade-700="rgba(109,40,217,1)" shade-800="rgba(91,33,182,1)" shade-900="rgba(76,29,149,1)"/>
                <dmcolor key="pink" color="rgba(236,72,153,1)" shade-50="rgba(253,242,248,1)" shade-100="rgba(252,231,243,1)" shade-200="rgba(251,207,232,1)" shade-300="rgba(249,168,212,1)" shade-400="rgba(244,114,182,1)" shade-500="rgba(236,72,153,1)" shade-600="rgba(219,39,119,1)" shade-700="rgba(190,24,93,1)" shade-800="rgba(157,23,77,1)" shade-900="rgba(131,24,67,1)"/>
                <dmcolor key="primary" color="rgba(59,130,246,1)" shade-950="#152e56" shade-900="#1c3d74" shade-800="#244e92" shade-700="#2b5eb3" shade-600="#3370d4" shade-500="rgba(59,130,246,1)" shade-400="#6c96f8" shade-300="#8fabfa" shade-200="#adc0fc" shade-100="#c8d6fd" shade-50="#e2ecfe"/>
            </dmdesignskill>
            <dmdesignskill skill="fonts"></dmdesignskill>
            <dmdesignskill skill="background" image_for_colors advanced="true" filter_blur="0" filter_brightness="100" filter_contrast="100" filter_grayscale="0" filter_hue-rotate="0" filter_invert="0" filter_opacity="100" filter_saturate="100" filter_sepia="0" keyword="surfing" image="https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDEyNXx8c3VyZmluZ3xlbnwwfHx8fDE3MTY0NjA2MDV8MA&ixlib=rb-4.0.3q=85&fm=jpg&crop=faces&cs=srgb&w=2000&h=2000&fit=crop" selector="img.hero-image"></dmdesignskill>
            <dmdesignskill skill="tailwind"></dmdesignskill>
        </dmdesign>
    </dmdesigns>
    <dmlocked tw-colors-gray="true" tw-colors-red="true" tw-colors-yellow="true" tw-colors-green="true" tw-colors-blue="true" tw-colors-indigo="true" tw-colors-purple="true" tw-colors-pink="true" background-image="true"></dmlocked>
</project>`),this.addLesson(e)}lesson_Bunny(){var e=this.newLesson("component_styling");e.name="Plain CSS Styling with Tailwind",e.short_description="Use Tailwind to style the project with plain CSS - without utility classes.",e.tags=["tailwind"],e.design_provider_key="tw",e.description=e.makeDesc("963109667",`<p>${e.short_description}</p>`,`<p>Watch the video and follow along in the editor.</p>`),e.addPage("index.html",`<!DOCTYPE html> 
<html lang="en"> 
    <head> 
        <meta charset="utf-8"> 
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> 
        <title>New page</title>         
        <link href="tailwind_theme/tailwind.css" rel="stylesheet" type="text/css">
    </head>     
    <body class="bg-pink-50 mx-auto p-12"> 
        <div class="max-w-3xl">
            <h1 class="font-bold mb-12 text-6xl tracking-tight">Peter the Bunny  <small class="font-thin text-pink-400">A cute story</small></h1>
            <img src="https://images.unsplash.com/photo-1591382386627-349b692688ff?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDE5fHxwZXRlciUyMHRoZSUyMGJ1bm55fGVufDB8fHx8MTcxMDg0ODg5OHww&ixlib=rb-4.0.3q=85&fm=jpg&crop=faces&cs=srgb&w=1200&h=800&fit=crop" class="max-w-lg my-8 object-cover ring-8 ring-pink-300 rounded-2xl shadow-lg"/>
            <div>
                <p class="font-thin leading-snug my-4 text-3xl text-gray-700">Peter loved to hop around the meadow, nibbling on clovers and playing with his friends.</p>
                <h2 class="decoration-auto decoration-pink-300 decoration-wavy font-bold font-sans text-4xl text-gray-700 underline">Cool Heading</h2>
                <p class="my-4 text-gray-600 tracking-tight text-xl font-extralight">One sunny day, Peter decided to go on an adventure beyond the meadow. He hopped through the forest, across a babbling brook, and found himself in <b class="hover:text-pink-600 text-pink-400">a beautiful garden</b> filled with the most delicious vegetables he had ever seen.</p>
                <h3 class="decoration-pink-300 font-sans text-xl underline">Heading 3 <small class="bg-pink-100 ml-2 p-2 rounded-lg">Small</small></h3>
                <p class="my-4 text-gray-600 tracking-tight text-xl font-extralight">With his heart filled with excitement, Peter feasted on carrots and lettuce until his little belly was content.</p>
                <p class="-mx-5 bg-pink-100 font-extralight my-4 p-8 rounded-3xl text-gray-600 text-xl tracking-tight">As the sun set, he returned to his burrow, dreaming of the wonderful day he had and the new adventures that awaited him.</p>
            </div>
        </div>
    </body>     
</html>
`),e.addPage("tailwind_theme/tailwind.css",``),e.addPage("projectdb.pgml",`<project>
    <documents></documents>
    <dmdesigns>
        <dmdesign active>
            <dmdesignskill skill="tw.colors">
                <dmcolor key="gray" color="rgba(107,114,128,1)" shade-50="rgba(249,250,251,1)" shade-100="rgba(243,244,246,1)" shade-200="rgba(229,231,235,1)" shade-300="rgba(209,213,219,1)" shade-400="rgba(156,163,175,1)" shade-500="rgba(107,114,128,1)" shade-600="rgba(75,85,99,1)" shade-700="rgba(55,65,81,1)" shade-800="rgba(31,41,55,1)" shade-900="rgba(17,24,39,1)"/>
                <dmcolor key="red" color="rgba(239,68,68,1)" shade-50="rgba(254,242,242,1)" shade-100="rgba(254,226,226,1)" shade-200="rgba(254,202,202,1)" shade-300="rgba(252,165,165,1)" shade-400="rgba(248,113,113,1)" shade-500="rgba(239,68,68,1)" shade-600="rgba(220,38,38,1)" shade-700="rgba(185,28,28,1)" shade-800="rgba(153,27,27,1)" shade-900="rgba(127,29,29,1)"/>
                <dmcolor key="yellow" color="rgba(245,158,11,1)" shade-50="rgba(255,251,235,1)" shade-100="rgba(254,243,199,1)" shade-200="rgba(253,230,138,1)" shade-300="rgba(252,211,77,1)" shade-400="rgba(251,191,36,1)" shade-500="rgba(245,158,11,1)" shade-600="rgba(217,119,6,1)" shade-700="rgba(180,83,9,1)" shade-800="rgba(146,64,14,1)" shade-900="rgba(120,53,15,1)"/>
                <dmcolor key="green" color="rgba(16,185,129,1)" shade-50="rgba(236,253,245,1)" shade-100="rgba(209,250,229,1)" shade-200="rgba(167,243,208,1)" shade-300="rgba(110,231,183,1)" shade-400="rgba(52,211,153,1)" shade-500="rgba(16,185,129,1)" shade-600="rgba(5,150,105,1)" shade-700="rgba(4,120,87,1)" shade-800="rgba(6,95,70,1)" shade-900="rgba(6,78,59,1)"/>
                <dmcolor key="blue" color="rgba(59,130,246,1)" shade-50="rgba(239,246,255,1)" shade-100="rgba(219,234,254,1)" shade-200="rgba(191,219,254,1)" shade-300="rgba(147,197,253,1)" shade-400="rgba(96,165,250,1)" shade-500="rgba(59,130,246,1)" shade-600="rgba(37,99,235,1)" shade-700="rgba(29,78,216,1)" shade-800="rgba(30,64,175,1)" shade-900="rgba(30,58,138,1)"/>
                <dmcolor key="indigo" color="rgba(99,102,241,1)" shade-50="rgba(238,242,255,1)" shade-100="rgba(224,231,255,1)" shade-200="rgba(199,210,254,1)" shade-300="rgba(165,180,252,1)" shade-400="rgba(129,140,248,1)" shade-500="rgba(99,102,241,1)" shade-600="rgba(79,70,229,1)" shade-700="rgba(67,56,202,1)" shade-800="rgba(55,48,163,1)" shade-900="rgba(49,46,129,1)"/>
                <dmcolor key="purple" color="rgba(139,92,246,1)" shade-50="rgba(245,243,255,1)" shade-100="rgba(237,233,254,1)" shade-200="rgba(221,214,254,1)" shade-300="rgba(196,181,253,1)" shade-400="rgba(167,139,250,1)" shade-500="rgba(139,92,246,1)" shade-600="rgba(124,58,237,1)" shade-700="rgba(109,40,217,1)" shade-800="rgba(91,33,182,1)" shade-900="rgba(76,29,149,1)"/>
                <dmcolor key="pink" color="rgba(236,72,153,1)" shade-50="rgba(253,242,248,1)" shade-100="rgba(252,231,243,1)" shade-200="rgba(251,207,232,1)" shade-300="rgba(249,168,212,1)" shade-400="rgba(244,114,182,1)" shade-500="rgba(236,72,153,1)" shade-600="rgba(219,39,119,1)" shade-700="rgba(190,24,93,1)" shade-800="rgba(157,23,77,1)" shade-900="rgba(131,24,67,1)"/>
                <dmcolor key="primary" color="rgb(189,116,89)" shade-50="#f5eae6" shade-100="#ecd2c8" shade-200="#e2baab" shade-300="#d7a28f" shade-400="#ca8b74" shade-500="rgb(189,116,89)" shade-600="#9c604a" shade-700="#7d4d3b" shade-800="#5f3a2d" shade-900="#42291f"/>
                <dmcolor key="secondary" color="rgb(94,53,37)" shade-50="#e7e1de" shade-100="#ccbcb6" shade-200="#b0988e" shade-300="#957569" shade-400="#7a5446" shade-500="rgb(94,53,37)" shade-600="#4e2c1f" shade-700="#3e231a" shade-800="#2f1b14" shade-900="#21130d"/>
                <dmcolor key="color3" color="rgb(226,159,127)" shade-50="#fbf1ec" shade-100="#f7e0d5" shade-200="#f3d0bf" shade-300="#eebfa9" shade-400="#e8af94" shade-500="rgb(226,159,127)" shade-600="#bb8469" shade-700="#956954" shade-800="#715040" shade-900="#4f382c"/>
                <dmcolor key="color4" color="rgb(142,172,181)" shade-50="#eef3f4" shade-100="#dbe4e7" shade-200="#c7d6da" shade-300="#b4c8ce" shade-400="#a1bac1" shade-500="rgb(142,172,181)" shade-600="#758e96" shade-700="#5e7278" shade-800="#47565b" shade-900="#323c3f"/>
            </dmdesignskill>
            <dmdesignskill skill="fonts" family_1="Open Sans" family_2="Caveat Brush"></dmdesignskill>
            <dmdesignskill skill="background" image_for_colors="true" advanced="true" filter_blur="0" filter_brightness="100" filter_contrast="100" filter_grayscale="0" filter_hue-rotate="0" filter_invert="0" filter_opacity="100" filter_saturate="100" filter_sepia="0" image="https://images.unsplash.com/photo-1572039863446-dd69ee840291?ixid=M3wyMDkyMnwwfDF8c2VhcmNofDU2fHx3YWxscGFwZXJ8ZW58MHx8fHwxNzE1ODA5MTg2fDA&ixlib=rb-4.0.3q=85&fm=jpg&crop=faces&cs=srgb&w=1200&fit=max"></dmdesignskill>
            <dmdesignskill skill="tailwind" disable.preflight></dmdesignskill>
        </dmdesign>
    </dmdesigns>
    <dmlocked tw-colors-gray="true" tw-colors-red="true" tw-colors-yellow="true" tw-colors-green="true" tw-colors-blue="true" tw-colors-indigo="true" tw-colors-purple="true" tw-colors-pink="true"></dmlocked>
</project>`),this.addLesson(e)}}new s})});