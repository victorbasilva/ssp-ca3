<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
	<xsl:template match="/">
        <xsl:for-each select="//item[@name='main']">
            <!-- Main featured game -->
            <div class="row featured-game-container mb-5">
                <img class="featured-game-img col-sm-6">
                    <xsl:attribute name="src">
                        <xsl:value-of select="img"/>
                    </xsl:attribute>
                </img>
                 <div class="col-sm-6 featured-game-container-details">
                    <h3 class="featured-subtitle mb-5">
                        <xsl:value-of select="title" />
                    </h3>
                    <p class="featured-text mb-5">
                        <xsl:value-of select="text" />
                    </p>
                    <p class="featured-dev"><span class="cpy dev">Developer:</span> <span class="dev-text"><xsl:value-of select="developer" /></span></p>
                    <p class="featured-pub"><span class="cpy pub">Publisher:</span> <span class="dev-text"><xsl:value-of select="publisher" /></span></p>
                </div>
            </div>
        </xsl:for-each>
        <xsl:for-each select="//item[@name='featured']">
            <!-- Each featured game -->
            <div class="col-sm-6 mb-5">
                <img width="100%" height="auto" class="featured-img">
                    <xsl:attribute name="src">
                        <xsl:value-of select="img"/>
                    </xsl:attribute>
                </img>
                <h4 class="featured-subtitle mb-4 mt-3">
                    <xsl:value-of select="title" />
                </h4>
                <p class="featured-text mb-5">
                    <xsl:value-of select="text" />
                </p>
                <p class="featured-dev"><span class="cpy dev">Developer:</span> <span class="dev-text"><xsl:value-of select="developer" /></span></p>
                <p class="featured-pub"><span class="cpy pub">Publisher:</span> <span class="dev-text"><xsl:value-of select="publisher" /></span></p>
            </div>
        </xsl:for-each>
	</xsl:template>
</xsl:transform>