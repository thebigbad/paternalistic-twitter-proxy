Paternalistic Twitter Proxy
==

Paternatlistic Twitter Proxy intercepts status updates, and refuses to proxy
updates that include location metadata.

Motivation
===

I really like using Seesmic's Twitter client for Android, but I worry the teeny
form factor will make it easy for me to accidentally tweet things I don't intend
(like my location).

Twitter does a great job of making you check a "include locations" box in your
settings before you can include locations in your tweets, but:

* I can check that box from my phone in a fit of madness.
* Twitter is free to take away that requirement without notice.

Install
===

On a public-facing server with node 0.4.2 or greater:

    $ node server.js

Alternate Installation on Duostack
===

If you have a beta account at duostack:

    $ gem install duostack
    $ duostack create $NAME
    $ duostack config stack node-0.4.2
    $ git push duostack master

The address of your proxy is: http://$NAME.duostack.net

Setup Seesmic for Android
===

Assuming you have Seesmic for Android installed and a Twitter account"

* Start up Seesmic
* Click on that adorable raccoon head to get the Accounts section
* Click on the plus sign to get to "Add an account"
* Choose "Twitter proxy"
* Enter Twitter username and password
* Uncheck "Use secure connection"
* Enter the address of your proxy in "REST API server" and "Search API server" fields
* Make sure "Use XAuth" is checked
* Scroll back up to the top and click "Sign In"

License
===

Paternalistic Twitter Proxy is licensed under the MIT License. See LICENSE for details.
