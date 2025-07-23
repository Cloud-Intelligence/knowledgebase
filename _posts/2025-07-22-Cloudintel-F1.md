---
layout: post
title: "From Laps to Legends: F1 Driver Battles Visualized with Metabase"
date: 2025-07-22
categories: analytics
excerpt: "How Cloud Intelligence used Metabase to settle the F1 GOAT debate."
image: 
author: Martin Muti
tags: [formula 1, metabase, data analytics, business intelligence, visualisations
]
---


<div style="display:flex; align-items:center; gap:16px; margin:20px 0; padding:16px 20px; background:#8DCAEF; border-radius:8px;">
  <img src="/assets/images/dashboard/ayrton-senna.png"
       alt="Ayrton Senna"
       style="width:72px; height:72px; border-radius:50%; object-fit:cover; box-shadow:0 2px 6px rgba(0,0,0,0.15);" />
  <blockquote style="margin:0; font-style:italic; line-height:1.45; color:white;">
    "If you no longer go for a gap that exists, you're no longer a racing driver."
    <br><span style="font-style:normal; font-weight:600; color:white;">— Ayrton Senna</span>
  </blockquote>
</div>

<div style="display: flex; align-items: center; gap: 10px; margin: 20px 0;">
  <h2 style="margin: 0; flex: 1;">When F1 Stats Need a Pit Wall, Not a Spreadsheet</h2>
  <img src="/assets/images/dashboard/CI-Logo.png" alt="CI Logo" style="max-width: 150px; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
</div>


Endless debates ripple through paddocks, pubs, and online forums: who is truly the better driver, [Lewis Hamilton](https://en.wikipedia.org/wiki/Lewis_Hamilton) or [Michael Schumacher](https://en.wikipedia.org/wiki/Michael_Schumacher)? [Alain Prost](https://en.wikipedia.org/wiki/Alain_Prost) or [Ayrton Senna](https://en.wikipedia.org/wiki/Ayrton_Senna)? Opinions are loud, but without data they remain just that; opinions. As lifelong F1 fans at Cloud Intelligence, we wanted a definitive, data-backed way to end the “who’s the best?, who’s the GOAT?” debate. To answer this puzzle, we engineered a [Metabase](https://www.metabase.com/) dashboard that replaces opinion with data backed evidence. Formula 1’s history stretches from 1950 to 2025 and the raw results are sprawling, inconsistent, and difficult to slice cleanly. Manually comparing two careers across wins, podiums, reliability, and longevity is tedious and error-prone. 

The Cloud Intelligence data team, using [Metabase](https://www.metabase.com/), set out to change that. We transformed decades of race records into an interactive, fan‑friendly dashboard that answers the head‑to‑head question in seconds. With a single stacked horizontal bar chart powered by smart SQL and well-structured [Metabase](https://www.metabase.com/) models, dominance, and the nuances behind it simplified into an easy to digest view that help fans compare and answer their question on who is the better driver.


## The Data Track: 1950–2024, Modeled to Race

Our data track begins with the well-known [Kaggle Formula 1 dataset](https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020), covering from 1950-2024 seasons. Rather than dumping CSVs straight into charts, we modeled the data inside [Metabase](https://www.metabase.com/). Drivers, results, and constructors were unified through consistent joins, and core performance metrics: wins, podiums, DNFs, total races, total points were calculated and exposed through a tidy semantic layer. This approach eliminates brittle spreadsheet hacks and one-off extracts; instead, every visualization draws from the same trustworthy foundation.


The star of the dashboard is the Driver Head‑to‑Head comparison horizontal bar chart and cards. The central question sounds simple; between any two drivers, who actually dominated, and in what way?, but true dominance is multifaceted. Wins matter, but so do podiums for consistency, DNFs for reliability, and total races for longevity. 

<div style="text-align: center; margin: 20px 0;">
  <img src="/assets/images/dashboard/Comparison Stacked chart.png" alt="Comparison horizontal chart stacked and cards" style="max-width: 80%; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
</div>

*A stacked horizontal bar with cards and filters compare drivers across generations.*  

Our visualization presents each of these measures as a separate row in a stacked horizontal bar with the aid of cards. Every bar is split by driver, so the length instantly conveys who leads on a given metric while the color reveals how the totals divide. Imagine seeing that a driver with fewer wins still boasts a higher podium ratio across a five-year span, or that another’s points haul is impressive despite frequent DNFs. In a glance, fans have data-backed ammunition for the next debate; analysts gain context without hunting through multiple stat sites.


<button style="background-color: #8DCAEF; color: white; padding: 10px 20px; 
border: none; border-radius: 5px; cursor: pointer; font-size: 16px; 
text-decoration: none;" onclick="window.location.href='http://metabase-681822224242.africa-south1.run.app/public/dashboard/eed606c9-2b57-4728-b00d-09eb3f0c5842'">
    Click here to view F1 dashboard 
</button>




<div style="display: flex; align-items: center; gap: 20px; margin: 20px 0;">
  <h2 style="margin: 0; flex: 1;">Why Metabase? The Open-Source Engine Behind the Dashboard</h2>
  <img src="/assets/images/dashboard/metabase-logo.png" alt="Metabse Logo" style="max-width: 200px; height: auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
</div>

[Metabase](https://www.metabase.com/) was the obvious choice for tearing down 75 years of F1 dataset and rebuilding them into something fans can actually interrogate. We needed to prototype fast, write real SQL, define clean models, and let users slice by driver or season without touching code. [Metabase](https://www.metabase.com/) delivers all of that: a native SQL editor for complex CTEs, semantic models to standardize joins (drivers, results, constructors), polished visuals for the stacked H2H bars, and filter widgets that make comparisons instant. No enterprise licensing maze; just iterate, share, refine.


Paired with Cloud Intelligence’s disciplined data modeling, [Metabase](https://www.metabase.com/) turns raw lap data into clarity: one trusted layer feeding every visualization, zero spreadsheet hacks. This dashboard proves how the right tool and the right team convert historic data into insight that matters.


## What Cloud Intelligence Brings to the Paddock
We turn raw Formula 1 sport data into visuals that answer real questions, who is the better driver based on racing metrics. Whether those questions fuel fan debates or boardroom decisions. Our process starts with understanding the stakeholder’s needs, moves through clean data modeling, and culminates in rapid dashboard builds that we iterate until they hit the mark. 


In the Cloud Intelligence data team , [Metabase](https://www.metabase.com/) and SQL are our tools of choice, but domain fluency is the secret sauce. This F1 demo is one among many vertical showcases we’ve built in finance, logistics, and retail; the industries change, but the clarity-first mindset does not.


Ready to settle debates with real data? If we can end the “greatest driver” argument with data, imagine what we can do for your business. Book a **[Book a demo](https://cloudintelligence.africa/)** or collaborate with us. We'll share starter models or build a custom analytics stack around your needs. Your move.

---
Made with ❤️ by [Cloud Intelligence](https://www.cloudintelligence.co.za/)