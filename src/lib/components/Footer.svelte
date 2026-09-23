<footer class="footer">
	<div class="wrap inner">
		<div class="brand">
			<img src="/logo.webp" alt="Elite Schilderwerken" width="320" height="135" />
		</div>
		<div>
			<strong>Elite Schilderwerken</strong><br />
			Spinnakerplantsoen 58, 1319 DG Almere<br />
			<a href="tel:0646461625">06-46 46 16 25</a> · <a href="mailto:eliteschilderwerken@gmail.com">eliteschilderwerken@gmail.com</a>
		</div>
		<nav aria-label="Voetmenu">
			<a href="#diensten">Diensten</a>
			<a href="#projecten">Projecten</a>
			<a href="#werkwijze">Werkwijze</a>
			<a href="#offerte">Offerte</a>
		</nav>
		<p class="small">© {new Date().getFullYear()} Elite Schilderwerken · KvK op aanvraag · Demo-ontwerp door JWCreative</p>
	</div>
</footer>

<style>
	.footer {
		background: var(--white);
		border-top: 1px solid var(--ink-200);
		padding-block: 48px;
		color: var(--ink-700);
		font-size: 0.95rem;
	}
	.inner {
		display: grid;
		gap: 22px;
	}
	.brand img {
		height: 48px;
		width: auto;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 18px;
	}
	nav a,
	.footer a {
		color: var(--teal-900);
		text-decoration: none;
	}
	nav a:hover,
	.footer a:hover {
		color: var(--red-500);
	}
	.small {
		margin: 0;
		font-size: 0.8rem;
		color: var(--ink-500);
	}
</style>
