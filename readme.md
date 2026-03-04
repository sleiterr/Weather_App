## Sådan kommer du i gang

1. **Hent projektet:** Klon via Git eller download som ZIP.
2. **Åbn i editor:** Åbn projektmappen i Visual Studio Code.
3. **Installer afhængigheder:** Åbn terminalen og kør `npm install`.
4. **Kør projektet:** Start det ønskede npm script.

## Environment variables (Expo)

1. Opret en `.env` fil i projektets rod.
2. Kopiér værdier fra `.env.example`.
3. Sæt din nøgle i `EXPO_PUBLIC_WEATHER_API_KEY`.
4. Genstart bundleren med `npm run start -- --clear`.

Expo kræver `EXPO_PUBLIC_` prefix for variabler, der bruges i app-koden.
