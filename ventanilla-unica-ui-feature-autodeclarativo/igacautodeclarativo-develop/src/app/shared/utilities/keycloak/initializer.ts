import {KeycloakService} from 'keycloak-angular';
import {environment} from '../../../../environments/environment';
import {StorageService} from '@shared/services/storage/storage.service';

export function initializer(keycloak: KeycloakService, storage: StorageService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.keycloak.issuer,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId
          },
          loadUserProfileAtStartUp: true,
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          enableBearerInterceptor: true,
          bearerExcludedUrls: [
            '/assets',
            'https://dev-procesos-api.igac.gov.co',
            'https://procesos-api.igac.gov.co',
            'https://gw-geoportal-test.igac.gov.co',
            'https://infocatastral.igac.gov.co/wsInfoCatastralRest'
          ]
        }).then(() => {
          
          keycloak.getKeycloakInstance().loadUserInfo().success(function(userInfo) {
            
          if (typeof userInfo === 'object') {
              storage.setAttributesInfo(userInfo);
          }
          
          }).error(function() {
            console.log('Failed to load user info');
          });
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
