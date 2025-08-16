// src/app/google-signin/google-signin.component.ts
import { AfterViewInit, Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const google: any;

@Component({
  selector: 'app-google-auth',
  template: `<div id="g_id_signin"></div>`,
})
export class GoogleAuthComponent implements AfterViewInit {
  constructor(private http: HttpClient, private zone: NgZone) {}

  ngAfterViewInit(): void {
    // Reemplaza con tu CLIENT_ID
    const CLIENT_ID =
      '309899984870-u8l4fvt1o1lfa7ccld0n3iolnqd5nle3.apps.googleusercontent.com';

    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: (response: any) => {
        // response.credential es el ID token de Google (JWT)
        const idToken = response.credential;

        console.log('ID Token:', idToken);

        // Enviar al backend para verificarlo y emitir nuestro JWT
        this.http
          .post('http://127.0.0.1:8080/api/auth/login/user/google', {
            credential: idToken,
          })
          .subscribe({
            next: (res) => {
              // Si tu backend establece cookie HttpOnly, no necesitas guardar nada aquí.
              // Si devuelve el JWT en body, guárdalo en memory/localStorage (según tu estrategia).
              alert('Login OK');
              console.log('Login OK', res);
            },
            error: (err) => {
              alert('Login Error');
              console.error('Login error', err);
            },
          });
      },
      // Opcional: para One Tap sólo en dominios propios
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    // Renderiza el botón
    google.accounts.id.renderButton(document.getElementById('g_id_signin'), {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signin_with',
      shape: 'pill',
    });

    // Opcional: One Tap
    // google.accounts.id.prompt();
  }
}
