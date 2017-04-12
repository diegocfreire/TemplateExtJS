package br.com.admin.util;

import br.com.admin.model.Usuario;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;


/**
 * Created by diego.freire on 24/11/2016.
 */

@Component
public class Rotinas {

    // Charsets
    public static final Charset UTF8 = Charset.forName("UTF-8");
    public static final Charset ISO88591 = Charset.forName("ISO-8859-1");
    private static final Locale PT_BR = new Locale("pt", "BR");
    private static final char[] ALL_CHARS = new char[62];
    private static final Random RANDOM = new Random();

    public Locale getPT_BR() {
        return PT_BR;
    }

    static {
        for (int i = 48, j = 0; i < 123; i++) {
            if (Character.isLetterOrDigit(i)) {
                ALL_CHARS[j] = (char) i;
                j++;
            }
        }
    }

    public static String senhaAleatoria(final int length) {
        final char[] result = new char[length];
        for (int i = 0; i < length; i++) {
            result[i] = ALL_CHARS[RANDOM.nextInt(ALL_CHARS.length)];
        }
        return new String(result);
    }

    //Função para criar hash da senha informada
    public static String md5(String senha){
        String sen = "";
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        BigInteger hash = new BigInteger(1, md.digest(senha.getBytes()));
        sen = hash.toString(16);
        return sen;
    }

    public static Map<String,Object> mapOK(List lista, Long total){
        Map<String,Object> modelMap = new HashMap<String,Object>(3);
        modelMap.put("total", total);
        modelMap.put("data", lista);
        modelMap.put("success", true);
        return modelMap;
    }

    public static Map<String,Object> mapOK(Object obj){
        Map<String,Object> modelMap = new HashMap<String,Object>(3);
        modelMap.put("data", obj);
        modelMap.put("success", true);
        return modelMap;
    }

    public static Map<String,Object> mapOK(){
        Map<String,Object> modelMap = new HashMap<String,Object>(3);
        modelMap.put("success", true);
        return modelMap;
    }

    public static Map<String,Object> mapOK(String tag, String valor){
        Map<String,Object> modelMap = new HashMap<String,Object>(3);
        modelMap.put(tag, valor);
        modelMap.put("success", true);
        return modelMap;
    }

    public static Map<String,Object> mapError(String msg){
        Map<String,Object> modelMap = new HashMap<String,Object>(2);
        modelMap.put("message", msg);
        modelMap.put("success", false);
        return modelMap;
    }

    public static void sendMail(String titulo, String nomeRemetente, String destinatarios, String corpoEmail) throws UnsupportedEncodingException, MessagingException, javax.mail.MessagingException {
        Properties prop = new Properties();
        prop.setProperty("mail.transport.protocol", "smtp");
        prop.put("mail.smtp.host", "smtp.mailgun.org");
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.port", "587");
        prop.put("mail.smtp.starttls.enable", "false");

        Authenticator auth = new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("postmaster@admin.com.br", "e55eca2ca6b8a190c60e7702253bae88");
            }
        };
        Session session = Session.getInstance(prop, auth);
        MimeMessage mimeMessage = new MimeMessage(session);
        mimeMessage.setFrom(new InternetAddress("postmaster@admin.com.br", nomeRemetente));

        String e[] = destinatarios.split(",");

        for (int i = 0; i < e.length; i++) {
            mimeMessage.addRecipient(Message.RecipientType.BCC, new InternetAddress(e[i]));
        }

        mimeMessage.setSubject(titulo);

        MimeMultipart alternative = new MimeMultipart("alternative");
        MimeBodyPart text = new MimeBodyPart();
        MimeBodyPart html = new MimeBodyPart();
        text.setText("text content");
        html.setContent(corpoEmail, "text/html");
        alternative.addBodyPart(text);
        alternative.addBodyPart(html);
        Message msg = new MimeMessage(session);
        msg.setContent(alternative);

        mimeMessage.setContent(alternative);
        mimeMessage.saveChanges();
        Transport.send(mimeMessage);
    }

    public static String getCorpoEmailCadUsu(Usuario usuario,String novaSenha) {
        return "<body>\n" +
                "<p><span style='font-size:12.0pt;line-height:115%;font-family:\n" +
                "\"Courier New\"'>Caro <b style=\"font-size:18px\">"+usuario.getDes_Nome()+"</b>,</span></p>\n" +
                "<p><span style='font-size:12.0pt;line-height:115%;font-family:\n" +
                "\"Courier New\"'>Seu cadastro foi criado no Admin App.</span></p>\n" +
                "<p><span style='font-size:12.0pt;line-height:115%;font-family:\n" +
                "\"Courier New\"'>Seu nome de usuário é <b style=\"font-size:18px\">"+usuario.getDes_User()+"</b>.</span></p>\n" +
                "<p><span style='font-size:12.0pt;line-height:115%;font-family:\n" +
                "\"Courier New\"'>Utilize a senha temporária <b style=\"font-size:18px\">"+novaSenha+"</b> para acessar o sistema.</span></p>\n" +
                "<p><span style='font-size:12.0pt;line-height:115%;font-family:\n" +
                "\"Courier New\"'>Ao acessar o sistema pela primeira vez, altere a senha temporária em<br></br>\n" +
                "<b style=\"font-style:italic\">\"Configurações >> Alterar Senha\"</b></span></p>\n" +
                "<p>&nbsp;</p>\n" +
                "<p><span style='font-size:12.0pt;line-height:115%;font-family:\n" +
                "\"Courier New\"'><a href=\"log.admin.com.br/admin\">Admin App\n" +
                "VLS</a></span></p>\n" +
                "</body>";
    }

}